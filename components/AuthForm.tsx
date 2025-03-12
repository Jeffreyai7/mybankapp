"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { getLoggedInUser, signIn, signUp } from "@/lib/actions/user.actions";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);

    try {
      // sign up with Appwrite and create a plaid token
      if (type === "signup") {
        const newUser = await signUp(data);
        setUser(newUser);
      }
      // sign in with Appwrite and create a plaid token
      if (type === "signin") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });

        if (response) {
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link
          href="/"
          className="mb-12 cursor-pointer flex items-center gap-1 "
        >
          <Image alt="logo" src={"/icons/logo.svg"} width={34} height={34} />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1 ">
            Everest
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "signin" ? "Sign In" : "Sign Up"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your Details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* {plaidlink acc} */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "signup" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      label={"First Name"}
                      name={"firstName"}
                      placeholder={"Enter your First Name"}
                    />
                    <CustomInput
                      control={form.control}
                      label={"Last Name"}
                      name={"lastName"}
                      placeholder={"Enter your Last Name"}
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    label={"Address"}
                    name={"address1"}
                    placeholder={"Enter your Address"}
                  />
                  <CustomInput
                    control={form.control}
                    label={"City"}
                    name={"city"}
                    placeholder={"Enter your City"}
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      label={"State"}
                      name={"state"}
                      placeholder={"ex: NY"}
                    />
                    <CustomInput
                      control={form.control}
                      label={"Postal Code"}
                      name={"postalCode"}
                      placeholder={"ex: 111011"}
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      label={"Date of Birth"}
                      name={"dateOfBirth"}
                      placeholder={"yyyy-mm-dd"}
                    />
                    <CustomInput
                      control={form.control}
                      label={"SSN"}
                      name={"ssn"}
                      placeholder={"ex: 1234"}
                    />
                  </div>
                </>
              )}

              <CustomInput
                control={form.control}
                label={"Email"}
                name={"email"}
                placeholder={"Enter your Email"}
              />
              <CustomInput
                control={form.control}
                label={"Password"}
                name={"password"}
                placeholder={"Enter your Password"}
              />
              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === "signin" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "signin"
                ? "Don't have an account"
                : "Already have an account"}
            </p>
            <Link
              className="form-link"
              href={type === "signin" ? "/sign-up" : "/sign-in"}
            >
              {type === "signup" ? "sign in" : "sign up"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
