// src/lib/server/appwrite.js
"use server";
import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";

export async function createSessionClient() {
  const cookiesStore = await cookies(); // Await the promise
  const session = cookiesStore.get("appwrite-session");

  console.log("Session Cookie:", session);

  if (!session || !session.value) {
    throw new Error("No session");
  }

  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}




export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  return {
    get account() {
      return new Account(client);
    },

    get database() {
      return new Databases(client);
    },

    get users() {
        return new Users(client);
    }
  };
}
