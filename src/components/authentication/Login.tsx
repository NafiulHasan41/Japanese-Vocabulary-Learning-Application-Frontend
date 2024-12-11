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
import { useRouter } from "next/navigation";
import useToast from "@/hooks/useToast";

const FormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export default function Login({ setToggle }: { setToggle: Dispatch<SetStateAction<boolean>> }) {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { signIn } = authContext;
  const router = useRouter();
  const showToast = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [eye, setEye] = useState(true);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await signIn(data.email, data.password);
      showToast("success", "Login successful");
      router.push("/lessons");
    } catch (error) {
      if (error instanceof Error) {
        showToast("error", error.message);
      
      } else {
        showToast("error", "An unknown error occurred");
        
      }
    }
  }

  return (
    <div className="w-[350px] md:w-[380px] rounded-2xl mx-auto p-5 md:p-7 border shadow-2xl">
      {/* Social login */}
      <div className="pb-3 border-b border-black">
        <h1 className="text-xl md:text-2xl font-bold text-black text-center">Login with</h1>
        <div className="flex gap-2 justify-center">
          <button className="border shadow-2xl text-white p-3 rounded-md mt-2">
            <FcGoogle />
          </button>
          <button className="border shadow-2xl text-sky-500 p-3 rounded-md mt-2">
            <FaFacebook />
          </button>
        </div>
        <h1 className="text-xs md:text-[14px] mt-3 font-bold text-gray-500 text-center">
          OR use your email and password
        </h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-2">
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
                    <Input type={eye ? "password" : "text"} placeholder="Enter your password" {...field} />
                    <p onClick={() => setEye(!eye)} className="absolute right-2 top-2">
                      {eye ? <FaEyeSlash /> : <FaEye />}
                    </p>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Submit Button */}
          <Button type="submit" className="bg-sky-400 w-full text-[16px] shadow-lg shadow-sky-100 font-bold text-black hover:bg-sky-100">
            Login
          </Button>
        </form>
      </Form>
      <div>
        <p className="text-center mt-6 text-gray-500">{`Don't have an account? `} <button onClick={() => setToggle(true)}  className="text-sky-400 underline">Sign up here</button></p>
      </div>
    </div>
  )
}
