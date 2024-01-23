//@ts-nocheck
"use client";

import * as React from "react";
import Link from "next/link";
import { Flower2, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";


export default function Navbarcenter() {
  const [state, setState] = React.useState(false);

  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      router.replace("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const menus = [
    { title: "Home", path: "/" },
    { title: "All Task", path: "/task" },
    { title: "Profile", path: "/profile" },
    { title: "About", path: "/about" },

  ];

  return (
    <div className="pb-16">
      <header className="p-2 shadow font-semibold w-full h-max bg-white dark:bg-black dark:text-white fixed top-0">
        <div className="flex justify-between">
          {!state ? (
            <Link
              href="/"
              aria-label="Back to homepage"
              className=" flex md:justify-between justify-between items-center"
            >
              <Flower2 />
              <span className="ml-2">Workinator</span>
            </Link>
          ) : null}
          <div className="flex">
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                state ? "block" : "hidden"
              }`}
            >
              <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0 mt-2 ml-5">
                {menus.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-gray-600 hover:text-rose-600 text-base"
                  >
                    <Link href={item.path}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="items-center flex-shrink-0 hidden lg:flex ml-6">
            {user ? (
              <Button
                onClick={handleLogout}
                className="px-8 py-2 font-semibold rounded hover:bg-rose-600 text-gray-50"
              >
                Logout
              </Button>
            ) : (
              <Link href={"/login"}>
                <Button className="px-8 py-2 font-semibold rounded hover:bg-rose-600 text-gray-50">
                  Log in
                </Button>
              </Link>
            )}
          </div>
          <button
            className="p-2 lg:hidden flex md:justify-center justify-start"
            title="menu"
            onClick={() => setState(!state)}
          >
            <Menu />
          </button>
        </div>
      </header>
    </div>
  );
}
