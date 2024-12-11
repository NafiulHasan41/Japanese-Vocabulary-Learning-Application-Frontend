"use client";

import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";
import { AuthContext } from "@/provider/AuthProvider";
import { imageUpload } from "@/provider/imageUpload";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/useToast";



const FormSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Enter a valid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm Password must be at least 6 characters long" }),
    image: z.instanceof(File, { message: "Image is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Registration({ setToggle }: { setToggle: Dispatch<SetStateAction<boolean>> }) {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { createUser , user } = authContext;
  const router = useRouter();
  const showToast = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      image: undefined,
    },
  });

  const [eye, setEye] = useState(true);
  const [confirmEye, setConfirmEye] = useState(true);
  const [uploading, setUploading] = useState(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setUploading(true);
      const imageURL = await imageUpload(data.image);
      await createUser(data.name, data.email, data.password, imageURL);
      showToast( "success" , " Registration successful Redirecting..." );
      
      if (user?.role === "admin") {
        router.push("/dashboard");
       
      } else {
        router.push("/lessons");
      }
    } catch (error) {
      if (error instanceof Error) {
        showToast("error", error?.message); 
     } else {
        showToast("error", "An unknown error occurred");
     }
     console.error(error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="w-[350px] md:w-[380px] rounded-2xl mx-auto p-5 md:p-7 border shadow-2xl">
    {/* Social register */}
    <div className="pb-3 border-b border-black">
      <h1 className="text-xl md:text-2xl font-bold text-black text-center">Register with</h1>
      <div className="flex gap-2 justify-center">
        <button className="border shadow-2xl text-white p-3 rounded-md mt-2">
          <FcGoogle />
        </button>
        <button className="border shadow-2xl text-sky-500 p-3 rounded-md mt-2">
          <FaFacebook />
        </button>
      </div>
      <h1 className="text-xs md:text-[14px] mt-3 font-bold text-gray-500 text-center">
        OR use Email to Register
      </h1>
    </div>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-2">
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={eye ? "password" : "text"}
                    placeholder="Enter your password"
                    {...field}
                  />
                  <p onClick={() => setEye(!eye)} className="absolute right-2 top-2 cursor-pointer">
                    {eye ? <FaEyeSlash /> : <FaEye />}
                  </p>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password Field */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={confirmEye ? "password" : "text"}
                    placeholder="Confirm your password"
                    {...field}
                  />
                  <p
                    onClick={() => setConfirmEye(!confirmEye)}
                    className="absolute right-2 top-2 cursor-pointer"
                  >
                    {confirmEye ? <FaEyeSlash /> : <FaEye />}
                  </p>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Upload Field */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="bg-sky-400 w-full text-[16px] shadow-lg shadow-sky-100 font-bold text-black hover:bg-sky-100"
          disabled={uploading}
        >
          {uploading ? "Registering..." : "Register"}
        </Button>
      </form>
    </Form>

    
    <div>
      <p className="text-center mt-2 text-gray-500">
        {`Have an account? `}
        <button onClick={() => setToggle(false)} className="text-sky-400 underline">
          Login here
        </button>
      </p>
    </div>
  </div>
);
}