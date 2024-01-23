"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../lib/firebase";

const Page = () => {

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const router = useRouter();

   const handleLogin = async () => {
     try {
       await signInWithEmailAndPassword(auth, email, password);
       router.push("/task");
     } catch (error) {
       console.error("Login failed", error);
     }
   };

  return (
    <div className="flex justify-center items-center min-h-[85vh]">
      <div>
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 shadow-md w-full">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Sign in</h1>
            <p className="text-sm ">Sign in to access your account</p>
          </div>
          <form action="" className="space-y-12">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="block mb-2 text-sm">
                  Email address
                </Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  id="email"
                  placeholder="leroy@jenkins.com"
                  className="w-full px-3 py-2"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <Label htmlFor="password" className="text-sm">
                    Password
                  </Label>
                  <Link href="/forget" className="text-xs hover:underline ">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  id="password"
                  placeholder="*****"
                  className="w-full px-3 py-2 "
                />
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <Button
                  type="button"
                  onClick={handleLogin}
                  className="w-full px-8 py-3 font-semibold"
                >
                  Sign in
                </Button>
              </div>
              <p className="px-6 text-sm text-center ">
                Don't have an account yet?
                <Link href="/signup" className="hover:underline text-rose-600">
                  Sign up
                </Link>
                .
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page