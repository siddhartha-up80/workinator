import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { auth } from "@/lib/firebase";

export const POST = async (request: any, response: any) => {

   const user = auth.currentUser;

   if (!user) {
     return new Response("Unauthorized", { status: 401 });
   }
 const db = getFirestore();
 const tasksCollection = collection(db, "tasks");

  const { name, task } = await request.json();

  try {
    await addDoc(tasksCollection, { name, task, createdBy: user.uid });
    
    return new Response(
      JSON.stringify({ message: "Task added successfully!" }),
      { status: 201 }
    );
  } catch (error) {
     console.error("Error adding task:", error);

    return new Response("Failed to add task", { status: 500 });
  }
};

export const PUT = async (request: any, response: any) => {

   const user = auth.currentUser;

   if (!user) {
     return new Response("Unauthorized", { status: 401 });
   }
   const db = getFirestore();

  const { name, task } = await request.json();

  try {
    const taskDoc = doc(db, "tasks", name);
    await updateDoc(taskDoc, { task });

    return new Response(
      JSON.stringify({ message: "Task updated successfully!" }),
      { status: 200 }
    );
  } catch (error) {
     console.error("Error updating task:", error);
    return new Response("Failed to Edit task", { status: 500 });
  }
};
