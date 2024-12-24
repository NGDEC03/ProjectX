// app/auth/signup/page.tsx
'use client';

import React from 'react';
import { CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Github, Twitter } from 'lucide-react';
import Link from 'next/link';

const SignInForm = () => {

  return (
    <div className="max-w-md mx-auto ">
      <CardHeader className="space-y-2 px-0">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Create Account</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Sign up to participate in coding contests
        </p>
      </CardHeader>

      <CardContent className="px-0 space-y-6">
        {/* Social Signup Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="w-full border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800">
            <Github className="mr-2 h-4 w-4" />
            Github
          </Button>
          <Button variant="outline" className="w-full border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800">
            <Twitter className="mr-2 h-4 w-4" />
            Twitter
          </Button>
        </div>

        <div className="relative">
          <Separator className="bg-slate-200 dark:bg-slate-800" />
          <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-900/80 px-2 text-slate-500 dark:text-slate-400 text-sm">
            or continue with
          </span>
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">Email</Label>
          <Input 
            id="email"
            type="email" 
            placeholder="john@example.com"
            className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 focus:ring-cyan-500 dark:focus:ring-cyan-600"
          />
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-slate-700 dark:text-slate-300">Password</Label>
          <Input 
            id="password"
            type="password" 
            placeholder="Create a password"
            className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 focus:ring-cyan-500 dark:focus:ring-cyan-600"
          />
        </div>
      </CardContent>

      <CardFooter className="px-0 flex-col space-y-4">
        <Button className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 dark:from-cyan-600 dark:to-emerald-600 dark:hover:from-cyan-700 dark:hover:to-emerald-700">
          Login
        </Button>
        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          New user?{' '}
          <Link href="/auth/signup" className="text-cyan-600 dark:text-cyan-500 hover:underline">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </div>
  );
};

export default SignInForm;