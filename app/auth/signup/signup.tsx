'use client';

import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/userContext';
import { OTPInput } from '@/components/ui/otp-input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type FormData = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
};

const SignUpForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [otpDialogOpen, setOtpDialogOpen] = useState(false);
    const { user, updateUser } = useUser();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const { toast } = useToast();

    const onOtpComplete = async (otp: string) => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email`, { "email": localStorage.getItem("email"), "verify_token": otp })
            toast({
                title: 'Success',
                description: 'Your account has been verified and created',
                duration: 3000,
            });
            router.push('/');
        }
        catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            toast({
                title: 'Error',
                description: axiosError.response?.data.message || 'An error occurred',
                duration: 3000,
                variant: 'destructive',
            });
        } finally {
            setOtpDialogOpen(false);
            localStorage.removeItem("email");
        }
    }
    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setIsLoading(true);
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, data);
            localStorage.setItem("email", data.email)
            setOtpDialogOpen(true);
        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;
            toast({
                title: 'Error',
                description: axiosError.response?.data.message || 'An error occurred',
                duration: 3000,
                variant: 'destructive'
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
            <Card className="max-w-md mx-auto p-6 bg-white dark:bg-slate-900 rounded-lg shadow-lg">
                <CardHeader className="space-y-2 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Create Account
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                        Sign up to participate in coding contests
                    </p>
                </CardHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                disabled={isLoading}
                                className="w-full border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                <BsGithub className="mr-2 h-4 w-4" />
                                Github
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                disabled={isLoading}
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

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="first_name"
                                    className="text-slate-700 dark:text-slate-300"
                                >
                                    First Name
                                </Label>
                                <Input
                                    id="first_name"
                                    placeholder="John"
                                    disabled={isLoading}
                                    {...register('first_name', { required: 'First name is required' })}
                                    className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 focus:ring-cyan-500 dark:focus:ring-cyan-600"
                                />
                                {errors?.first_name && (
                                    <p className="text-sm text-red-600">{errors.first_name.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label
                                    htmlFor="last_name"
                                    className="text-slate-700 dark:text-slate-300"
                                >
                                    Last Name
                                </Label>
                                <Input
                                    id="last_name"
                                    placeholder="Doe"
                                    disabled={isLoading}
                                    {...register('last_name', { required: 'Last name is required' })}
                                    className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 focus:ring-cyan-500 dark:focus:ring-cyan-600"
                                />
                                {errors?.last_name && (
                                    <p className="text-sm text-red-600">{errors.last_name.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="text-slate-700 dark:text-slate-300"
                            >
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
                                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: 'Enter a valid email',
                                    },
                                })}
                                className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 focus:ring-cyan-500 dark:focus:ring-cyan-600"
                            />
                            {errors?.email && (
                                <p className="text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="password"
                                className="text-slate-700 dark:text-slate-300"
                            >
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Create a password"
                                disabled={isLoading}
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters long',
                                    },
                                })}
                                className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 focus:ring-cyan-500 dark:focus:ring-cyan-600"
                            />
                            {errors?.password && (
                                <p className="text-sm text-red-600">{errors.password.message}</p>
                            )}
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 dark:from-cyan-600 dark:to-emerald-600 dark:hover:from-cyan-700 dark:hover:to-emerald-700"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </Button>
                        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                            Already have an account?{' '}
                            <Link
                                href="/auth/signin"
                                className="text-cyan-600 dark:text-cyan-500 hover:underline"
                            >
                                Sign in
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>

            <Dialog open={otpDialogOpen} onOpenChange={setOtpDialogOpen}>
                <DialogContent className="sm:max-w-[425px] bg-white dark:bg-slate-900">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white">Enter OTP</DialogTitle>
                        <DialogDescription className="text-slate-600 dark:text-slate-400">
                            Please enter the 4-digit code sent to your email.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center py-4">
                        <OTPInput length={4} onComplete={onOtpComplete} />
                    </div>
                    {/* <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                        Didn&apos;t receive the code?{' '}
                        <Button variant="link" className="p-0 h-auto text-cyan-600 dark:text-cyan-500 hover:underline">
                            Resend
                        </Button>
                    </p> */}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SignUpForm;
