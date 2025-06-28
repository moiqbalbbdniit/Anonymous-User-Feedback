'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLoader } from "@/context/LoaderContext";

const Page = () => {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debounced = useDebounceCallback(setUsername, 300);
  const router = useRouter();
  const { startLoading, stopLoading } = useLoader();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (!username.trim()) return;
      setIsCheckingUsername(true);
      setUsernameMessage("");

      try {
        const response = await axios.get(
          `/api/check-username-unique?username=${username}`
        );

        setUsernameMessage(response.data.message);
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        setUsernameMessage(
          axiosError.response?.data.message ??
            "An error occurred in checking username"
        );
      } finally {
        setIsCheckingUsername(false);
      }
    };

    checkUsernameUnique();
  }, [username]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>("/api/sign-up", data);
      toast.success(response.data.message);
      startLoading();
      router.replace("/sign-in");
      stopLoading();
    } catch (error) {
      console.error("Error in sign-up", error);
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data.message ?? "An error occurred in sign-up"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl border border-white/20">
        <div className="text-center text-white">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            Sign Up
          </h1>
          <p className="text-sm text-gray-300">
            Join Iqbal&apos;s Project for anonymous messaging
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Username</FormLabel>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      debounced(e.target.value);
                    }}
                    placeholder="Choose a unique username"
                  />
                  {username.trim() && (
                    <>
                      {isCheckingUsername ? (
                        <Loader2 className="animate-spin h-4 w-4 text-blue-400 mt-1" />
                      ) : (
                        usernameMessage && (
                          <p
                            className={`text-sm mt-1 ${
                              usernameMessage === "Username is available"
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {usernameMessage}
                          </p>
                        )
                      )}
                    </>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <Input {...field} placeholder="Enter your email" />
                  <p className="text-xs text-gray-400 mt-1">
                    We will send you a verification code
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Create a strong password"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center mt-4 text-gray-300">
          <p>
            Already a member?{" "}
            <Link
              href="/sign-in"
              onClick={() => {
                startLoading();
                stopLoading();
              }}
              className="text-blue-400 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
