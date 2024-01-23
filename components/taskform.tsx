//@ts-nocheck
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { setDoc, doc, updateDoc, getDocs } from "firebase/firestore";
import { auth, firestore } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

interface FormData {
  name: string;
  task: string;
}

const Taskform = ({ adding, data }: any) => {
  const [formData, setFormData] = useState<FormData>({
    name: data?.name || "",
    task: data?.task || "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      console.error("User not authenticated");
      return;
    }

    // const tasksCollection = firestore.collection("tasks");

    try {
      if (adding) {
        await addDoc(collection(firestore, "tasks"), {
          ...formData,
          createdBy: user.uid,
        });
        alert("Task added successfully!");
      } else {
        // Query Firestore to find the document ID associated with the task
        const querySnapshot = await getDocs(collection(firestore, "tasks"));
        const taskDoc = querySnapshot.docs.find(
          (doc) => doc.data().name === formData.name
        );

        if (taskDoc) {
          // Use the retrieved document ID for updating
          const taskDocRef = doc(firestore, "tasks", taskDoc.id);
          await updateDoc(taskDocRef, {
            task: formData.task,
          });
          alert("Task updated successfully!");
        } else {
          alert(`No document found with name: ${formData.name}`);
        }
      }

      // Reset form after successful submission
      setFormData({
        name: "",
        task: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit task. Please try again later.");
    }
  };

  return (
    <>
      <div className="items-center flex justify-center w-full flex-col md:max-w-[40vw] mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold leading-loose tracking-tight sm:text-4xl">
            {adding ? "Add Task details" : "Update Task details"}
          </h2>
        </div>

        <section className="w-full mt-10">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
          >
            <div className="sm:col-span-2">
              <Label
                htmlFor="name"
                className="block text-sm font-medium leading-5"
              >
                Name
                <div className="mt-1 rounded-md shadow-sm">
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    required={true}
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-md shadow-sm  "
                  />
                </div>
              </Label>
            </div>

            <div className="sm:col-span-2">
              <Label
                htmlFor="hobbies"
                className="block text-sm font-medium leading-5"
              >
                Task
                <Textarea
                  id="task"
                  name="task"
                  rows={4}
                  required={true}
                  value={formData.task}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 mt-1 shadow-sm"
                />
              </Label>
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" className="w-full font-semibold">
                {adding ? "Add" : "Update"} Task
              </Button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default Taskform;
