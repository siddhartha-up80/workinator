import { getFirestore, collection, getDocs } from "firebase/firestore";
import { auth } from "@/lib/firebase";

export const GET = async (request: any) => {

  const user = auth.currentUser;

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

   const db = getFirestore();
   const tasksCollection = collection(db, "tasks");

  try {
    const snapshot = await getDocs(tasksCollection);
    const tasks = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));


    return new Response(JSON.stringify(tasks), { status: 201 });
  } catch (error) {
    return new Response("Failed to get task", { status: 500 });
  }
};
