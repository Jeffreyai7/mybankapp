"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";

const AuthForm = ({ type }: { type: string }) => {
  const [user, setuser] = useState(null);

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
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
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
        <>Form</>
      )}
    </section>
  );
};

export default AuthForm;
