"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth } from "@/lib/firebase";

const Signup = () => {

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const router = useRouter();

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/login");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh]">
      <div>
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 shadow-md w-full">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
            <p className="text-sm ">Sign Up to access your account</p>
          </div>
          <form action="" className="space-y-12">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="block mb-2 text-sm">
                  Email address
                </Label>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  placeholder="name@email.com"
                  className="w-full px-3 py-2"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <Label htmlFor="password" className="text-sm">
                    Password
                  </Label>
                </div>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  placeholder="*****"
                  className="w-full px-3 py-2 "
                />
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <Button
                  onClick={handleRegister}
                  type="button"
                  className="w-full px-8 py-3 font-semibold"
                >
                  Sign Up
                </Button>
              </div>
              <p className="px-6 text-sm text-center ">
                Already have an account?
                <Link href="/login" className="hover:underline text-rose-600">
                  Sign in
                </Link>
                .
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
