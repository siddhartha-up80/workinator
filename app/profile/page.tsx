"use client";

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from '@firebase/auth';
import { auth } from '../../lib/firebase';
import { getAuth, onAuthStateChanged } from "@firebase/auth";


const Page = () => {

   const router = useRouter();
    const [userDetails, setUserDetails] = useState<any | null>(null);

   useEffect(() => {
     const unsubscribe = onAuthStateChanged(auth, (user) => {
       if (!user) {
         // Redirect to login page if user is not authenticated
         router.replace("/login");
       } else {
         // Update user details in the state
         setUserDetails({
           displayName: user.displayName,
           email: user.email,
           photoURL: user.photoURL,
           phoneNumber: user.phoneNumber,
         });
       }
     });

     return () => unsubscribe();
   }, [router]);

const handleLogout = async () => {
      try {
        await signOut(auth);
        router.push('/login');
      } catch (error) {
        console.error('Logout failed', error);
      }
    }

  return (
    <div className="flex justify-center items-center min-h-[75vh] flex-col gap-4">
      <div className="">
        <div className="max-w-md p-8 sm:flex sm:space-x-6 shadow-md">
          <div className="flex flex-col space-y-4">
            <div className="space-y-1">
              <span className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  aria-label="Email address"
                  className="w-4 h-4"
                >
                  <path
                    fill="currentColor"
                    d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"
                  ></path>
                </svg>
                <span className="">{userDetails?.email}</span>
              </span>
              
            </div>
          </div>
        </div>
        <div className="w-full mt-5">
          <Button className="w-full" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page