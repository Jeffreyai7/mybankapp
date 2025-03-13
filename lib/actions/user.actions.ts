"use server";
import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../server/appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();
    const response = await account.createEmailPasswordSession(email, password);

    // ✅ Set the session cookie after successful sign-in
    const cookiesStore = await cookies();
    cookiesStore.set({
      name: "appwrite-session",
      value: response.secret,
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return parseStringify(response);

  } catch (error) {
    console.error("Sign-In Error:", error);
    throw new Error("Failed to sign in.");
  }
};

export const signUp = async (userData : SignUpParams) => {
    const { email, password, lastName, firstName } = userData;
    try{
        const { account } = await createAdminClient();

       const newUserAccount = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);
        const session = await account.createEmailPasswordSession(email, password);
      
        const cookiesStore = await cookies();

        cookiesStore.set({
          name: "appwrite-session",
          value: session.secret,
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });
      
        return parseStringify(newUserAccount)
        // redirect("/account");
    }catch(error) {
        console.error("Error", error)
    }
}



// ... your initilization functions

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user =  await account.get();

    return parseStringify(user);

  } catch (error) {
    return null;
  }
}



export const logoutAccount = async () => {
  try{

    const { account } = await createSessionClient();

    const cookiesStore = await cookies();
    cookiesStore.delete("appwrite-session")

await account.deleteSession("current");

  }catch(error){
    return null
  }


    }