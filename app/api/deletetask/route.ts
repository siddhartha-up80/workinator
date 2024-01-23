import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { auth } from "@/lib/firebase";

export const POST = async (request: any) => {

  const user = auth.currentUser;

   if (!user) {
     return new Response("Unauthorized", { status: 401 });
   }

  const { name } = await request.json();
  const db = getFirestore();
  const taskDoc = doc(db, "tasks", name);

  try {
     await deleteDoc(taskDoc);


    // Delete the person from the database

    return new Response("task deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete task", { status: 500 });
  }
};
