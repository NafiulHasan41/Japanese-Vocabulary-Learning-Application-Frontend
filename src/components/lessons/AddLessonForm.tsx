"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useToast from "@/hooks/useToast";
import useAxios from "@/hooks/useAxios";
import axios, { AxiosError } from "axios";

const FormSchema = z.object({
  name: z.string().min(1, { message: "Lesson name is required" }),
  lessonNumber: z.number().positive({ message: "Lesson number must be positive" }),
});

export default function AddLessonForm() {
  const axios1 = useAxios();
  const showToast = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      lessonNumber: undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await axios1.post("/api/lessons", data);
      showToast("success", "Lesson added successfully!");
      form.reset();
    } catch (error) {
        // console.log(error);
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
          <h2 className="text-xl font-semibold mb-4">Add Lesson</h2>
          <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {/* Lesson Name */}
                  <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Lesson Name</FormLabel>
                              <FormControl>
                                  <Input placeholder="Enter lesson name" {...field} />
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
                                      onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                                  />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}
                  />
                  {/* Submit Button */}
                  <Button type="submit" className="w-full bg-sky-500 hover:scale-110 hover:bg-sky-300 text-black font-semibold">
                      Add Lesson
                  </Button>
              </form>
          </Form>
      </div>
  );
}
