'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useUser } from '@/context/userContext';
import { useToast } from '@/hooks/use-toast';
// import { BsGithub, BsGoogle } from 'react-icons/bs';
import { Loader2 } from 'lucide-react';
import { ResetPasswordDialog } from './ResetPassword';

type FormData = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const { user, updateUser, setUser } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, data, {
        withCredentials: true,
      });
      setUser(res.data.user);
      toast({
        title: 'Welcome back!',
        description: 'You have successfully signed in',
        duration: 3000,
      });
      router.push('/');
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast({
        title: 'Error',
        description: axiosError.response?.data.message || 'An error occurred',
        duration: 3000,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    updateUser();
    if (user?.Email) {
      router.push('/');
    }
  }, [user?.Email, router, updateUser]);

  return (
    <>
      <div className="relative max-w-md mx-auto p-6 bg-white/80 dark:bg-slate-900/80 rounded-lg shadow-lg backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-100 to-white dark:from-slate-950 dark:to-slate-900 rounded-lg -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-emerald-500/5 to-transparent dark:from-cyan-600/20 dark:via-emerald-500/10 dark:to-transparent rounded-lg -z-10" />
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(20,184,166,0.1)_0deg,transparent_60deg,transparent_300deg,rgba(20,184,166,0.1)_360deg)] dark:bg-[conic-gradient(from_0deg_at_50%_50%,rgba(20,184,166,0.2)_0deg,transparent_60deg,transparent_300deg,rgba(20,184,166,0.2)_360deg)] rounded-lg -z-10" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader className="space-y-2 px-0">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Sign In</h2>
            <p className="text-slate-600 dark:text-slate-400">
              Welcome back! Sign in to your account
            </p>
          </CardHeader>

          <CardContent className="px-0 space-y-6">
            {/* Social buttons and separator - same as before */}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                disabled={isLoading}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Enter a valid email address',
                  },
                })}
                className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 focus:ring-cyan-500 dark:focus:ring-cyan-600"
              />
              {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-slate-700 dark:text-slate-300">
                  Password
                </Label>
                <Button
                  type="button"
                  variant="link"
                  className="px-0 text-cyan-600 dark:text-cyan-500 hover:text-cyan-700 dark:hover:text-cyan-400"
                  onClick={() => setIsResetDialogOpen(true)}
                >
                  Forgot password?
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                disabled={isLoading}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 focus:ring-cyan-500 dark:focus:ring-cyan-600"
              />
              {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
            </div>
          </CardContent>

          <CardFooter className="px-0 flex-col space-y-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 dark:from-cyan-600 dark:to-emerald-600 dark:hover:from-cyan-700 dark:hover:to-emerald-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
              Don&apos;t have an account?{' '}
              <Link href="/auth/signup" className="text-cyan-600 dark:text-cyan-500 hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </div>

      <ResetPasswordDialog
        isOpen={isResetDialogOpen}
        onClose={() => setIsResetDialogOpen(false)}
      />
    </>
  );
};

export default SignInForm;