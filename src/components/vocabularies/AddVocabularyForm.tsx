"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useToast from "@/hooks/useToast";
import useAxios from "@/hooks/useAxios";
import axios from "axios";
import { AuthContext } from "@/provider/AuthProvider";

const FormSchema = z.object({
  word: z.string().min(1, { message: "Word is required" }),
  pronunciation: z.string().min(1, { message: "Pronunciation is required" }),
  whenToSay: z.string().min(1, { message: "Description is required" }),
  lessonNumber: z.number().positive({ message: "Lesson number must be positive" }),
  adminEmail: z.string().email({ message: "Admin email is required" }),
});

export default function AddVocabularyForm() {
  const axios1 = useAxios();
  const showToast = useToast();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const {  user } = authContext;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      word: "",
      pronunciation: "",
      whenToSay: "",
      lessonNumber: undefined,
      adminEmail: user?.email || "", // Prefill with user email
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await axios1.post("/api/vocabularies", data);
      showToast("success", "Vocabulary added successfully!");
      form.reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast("error", (error.response?.data as { message?: string })?.message || "An error occurred");
      } else if (error instanceof Error) {
        showToast("error", error.message);
      } else {
        showToast("error", "An unknown error occurred");
      }
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add Vocabulary</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Word */}
          <FormField
            control={form.control}
            name="word"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Word</FormLabel>
                <FormControl>
                  <Input placeholder="Enter word" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Pronunciation */}
          <FormField
            control={form.control}
            name="pronunciation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pronunciation</FormLabel>
                <FormControl>
                  <Input placeholder="Enter pronunciation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* When to Say */}
          <FormField
            control={form.control}
            name="whenToSay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>When to Say</FormLabel>
                <FormControl>
                  <Input placeholder="Enter usage description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Lesson Number */}
          <FormField
            control={form.control}
            name="lessonNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lesson Number</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter lesson number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value === "" ? undefined : Number(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Admin Email */}
          <FormField
            control={form.control}
            name="adminEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Admin Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Admin email"
                    readOnly
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-sky-500 hover:scale-110 hover:bg-sky-300 text-black font-semibold"
          >
            Add Vocabulary
          </Button>
        </form>
      </Form>
    </div>
  );
}
