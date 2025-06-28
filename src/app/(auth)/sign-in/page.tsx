'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useLoader } from '@/context/LoaderContext';

const signInSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignInForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { startLoading, stopLoading } = useLoader();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setLoading(true);

    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    setLoading(false);

    if (result?.error) {
      startLoading();
      toast.error("Invalid email or password");
      stopLoading();
      return;
    }

    if (result?.url) {
      startLoading();
      toast.success("Login successful! Redirecting...");
      router.replace('/dashboard');
      stopLoading();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl border border-white/20">
        <div className="text-center text-white">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-300">Sign in to continue your secret conversations</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <Input type="email" placeholder="Enter your email" {...field} />
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
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...field}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-200 transition"
                      onClick={() => setShowPassword(prev => !prev)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center mt-4 text-gray-300">
          <p>
            Not a member yet?{' '}
            <Link
              href="/sign-up"
              onClick={() => { startLoading(); stopLoading(); }}
              className="text-blue-400 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
