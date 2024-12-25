'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@/context/userContext';
import { useToast } from '@/hooks/use-toast';
import { BsGithub, BsGoogle } from 'react-icons/bs';

type FormData = {
  email: string;
  password: string;
};

const SignInForm = () => {

  const { user, updateUser, setUser } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, data, {
        withCredentials: true,
      });
      setUser(res.data.user);
      toast({
        title: 'Welcome',
        description: 'You have successfully signed in',
        duration: 3000,
      });
      console.log(res.data.message);
      console.log(res.data.user);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      console.error("Error fetching user:", axiosError.message);
      toast({
        title: 'Error',
        description: axiosError.message,
        duration: 3000,
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    updateUser();
    if (user?.Email) {
      router.push('/');
    }
  }, [user?.Email, router, updateUser]);

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader className="space-y-2 px-0">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Create Account</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Sign up to participate in coding contests

          </p>
        </CardHeader>

        <CardContent className="px-0 space-y-6">

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="w-full border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <BsGithub className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button
              variant="outline"
              className="w-full border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <BsGoogle className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>

          <div className="relative">
            <Separator className="bg-slate-200 dark:bg-slate-800" />
            <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-900/80 px-2 text-slate-500 dark:text-slate-400 text-sm">
              or continue with
            </span>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
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
            <Label htmlFor="password" className="text-slate-700 dark:text-slate-300">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
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
            className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 dark:from-cyan-600 dark:to-emerald-600 dark:hover:from-cyan-700 dark:hover:to-emerald-700"
          >
            Sign Up
          </Button>
          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-cyan-600 dark:text-cyan-500 hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </form>
    </div>
  );
};

export default SignInForm;
