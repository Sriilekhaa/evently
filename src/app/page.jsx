"use client";

import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { useSession, signOut } from "next-auth/react";

const Page = () => {
  const router = useRouter();
  const { data, status } = useSession();

  return (
    <div className="container flex flex-col justify-between mx-auto my-5">
      <nav className="flex items-center justify-between w-full px-4 py-2 mx-auto text-white bg-gray-900 border rounded-lg">
        <div className="text-xl font-semibold text-white">NEXTJS:3000</div>
        <div className="flex items-center gap-x-3">
          {!data ? (
            <>
              <Button variant="ghost" onClick={() => router.push("/sign-in")}>
                Login
              </Button>
              <Button variant="ghost" onClick={() => router.push("/sign-up")}>
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => {
                  signOut();
                }}>
                Logout
              </Button>
              <Button
                variant="default"
                onClick={() => router.push("/console/events")}>
                Go to Console
              </Button>
            </>
          )}
        </div>
      </nav>
      <span className="text-4xl font-bold"></span>
    </div>
  );
};

export default Page;
