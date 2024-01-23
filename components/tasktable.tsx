"use client";

import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";
import Taskform from "./taskform";

import { getDocs, deleteDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";

import { auth, firestore } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

const TaskTable = () => {
  const [task, setTask] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  const gettask = () => {
    setLoading(true);

    const tasksCollection = collection(firestore, "tasks");

    // Set up a real-time listener for changes to the tasks collection
    const unsubscribe = onSnapshot(tasksCollection, (querySnapshot) => {
      const tasksData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setTask(tasksData);
      setLoading(false);
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = gettask();

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const deletetask = async (name: string) => {
    try {
      if (!name) {
        console.error("Task name is empty");
        return;
      }

      const tasksCollection = collection(firestore, "tasks");

      // Query Firestore to find the document ID associated with the task
      const querySnapshot = await getDocs(tasksCollection);
      const taskDoc = querySnapshot.docs.find(
        (doc) => doc.data().name === name
      );

      if (taskDoc) {
        // Use the retrieved document ID for deletion
        await deleteDoc(doc(firestore, "tasks", taskDoc.id));

        // Refresh the list after deletion
        gettask();
        alert("Task deleted successfully!");
      } else {
        alert(`No document found with name: ${name}`);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again later.");
    } finally {
      // Close the delete confirmation dialog
      console.log("Closed");
    }
  };

  // console.log(task)

  const sendEmail = (item: any) => {
    try {
      const subject = "Subject";
      const body = `selected task details:  
      name: ${item.name},
      task: ${item.task}`;
      const mailtoLink = `mailto:siddhartha.singh3093@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      window.location.href = mailtoLink;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" w-full mx-auto">
      {!loading ? (
        <>
          <Table>
            <TableCaption>A list of hobbies and interests</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">SN</TableHead>
                <TableHead className="">Name</TableHead>
                <TableHead className="">Task</TableHead>
                <TableHead className="">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {task.map((item: any, index: any) => (
                <TableRow key={item.name}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="">{item.task}</TableCell>
                  <TableCell className="">
                    <span className="flex gap-2">
                      <Dialog>
                        <DialogTrigger>
                          <Button>Edit</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <Taskform data={item} />
                        </DialogContent>
                      </Dialog>
                      <Button onClick={() => sendEmail(item)}>
                        Send Email
                      </Button>
                      <Dialog>
                        <DialogTrigger>
                          <Button variant={"destructive"}>Delete</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete Task</DialogTitle>
                          </DialogHeader>
                          <DialogDescription className="flex flex-col flex-1">
                            Are you sure you want to delete this task?
                            <p className="text-red-500">
                              This action cannot be undone.
                            </p>
                          </DialogDescription>

                          <Button
                            variant={"destructive"}
                            onClick={() => deletetask(item.name)}
                          >
                            Yes
                          </Button>
                        </DialogContent>
                      </Dialog>
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={50}>Total</TableCell>
                <TableCell className="text-right">{task.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </>
      ) : (
        <div>
          <div>
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-rose-600 mx-auto"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskTable;
