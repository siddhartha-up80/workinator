"use client";

import TaskTable from "@/components/tasktable";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { auth } from "@/lib/firebase";

const Dialogbox = dynamic(() => import("@/components/dialogbox"), {
  ssr: false,
});

const Page = () => {

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Redirect to login page if user is not authenticated
        router.replace("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div>
      <div className="flex justify-end container">
        {/* <Dialogbox/> */}
        <Dialogbox />
      </div>
      <div>
        <div className="container">
          <TaskTable />
        </div>
      </div>
    </div>
  );
};

export default Page;
