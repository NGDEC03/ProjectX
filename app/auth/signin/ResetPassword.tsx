import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios, { AxiosError } from 'axios';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from '@/components/ui/dialog';
import { OTPInput } from '@/components/ui/otp-input';
import { Loader2 } from 'lucide-react';

interface ResetPasswordDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

type Stage = 'email' | 'otp' | 'password';

export const ResetPasswordDialog = ({ isOpen, onClose }: ResetPasswordDialogProps) => {
    const [stage, setStage] = useState<Stage>('email');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const { toast } = useToast();

    const startTimer = () => {
        setTimeLeft(30);
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleSendEmail = async () => {
        setIsLoading(true);
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset/send-email`, { email });
            toast({
                title: 'Success',
                description: 'Reset password email sent successfully',
                duration: 3000,
            });
            startTimer();
            setStage('otp');
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

    const handleVerifyOTP = async (otp: string) => {
        setIsLoading(true);
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset/verify-otp`, {
                email,
                verify_token: otp,
            });
            toast({
                title: 'Success',
                description: 'OTP verified successfully',
                duration: 3000,
            });
            setStage('password');
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

    const handleChangePassword = async () => {
        setIsLoading(true);
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset/change-password`, {
                email,
                password,
            });
            toast({
                title: 'Success',
                description: 'Password changed successfully',
                duration: 3000,
            });
            onClose();
            setStage('email');
            setEmail('');
            setPassword('');
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

    const slideVariants = {
        enter: { x: 300, opacity: 0 },
        center: { x: 0, opacity: 1 },
        exit: { x: -300, opacity: 0 },
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-white dark:bg-slate-900 overflow-hidden">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                        Reset Password
                    </DialogTitle>
                    <DialogDescription className="text-slate-600 dark:text-slate-400">
                        {stage === 'email'
                            ? 'Enter your email to receive a reset code'
                            : stage === 'otp'
                                ? 'Enter the code sent to your email'
                                : 'Enter your new password'}
                    </DialogDescription>
                </DialogHeader>

                <AnimatePresence mode="wait">
                    {stage === 'email' && (
                        <motion.div
                            key="email"
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="space-y-4"
                        >
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    disabled={isLoading}
                                    className="bg-white/50 dark:bg-slate-800/50"
                                />
                            </div>
                            <Button
                                onClick={handleSendEmail}
                                disabled={isLoading || timeLeft > 0}
                                className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : timeLeft > 0 ? (
                                    `Resend in ${timeLeft}s`
                                ) : (
                                    'Send Reset Code'
                                )}
                            </Button>
                        </motion.div>
                    )}

                    {stage === 'otp' && (
                        <motion.div
                            key="otp"
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="space-y-4"
                        >
                            <div className="flex justify-center py-4">
                                <OTPInput length={4} onComplete={handleVerifyOTP} />
                            </div>
                        </motion.div>
                    )}

                    {stage === 'password' && (
                        <motion.div
                            key="password"
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="space-y-4"
                        >
                            <div className="space-y-2">
                                <Label htmlFor="new-password">New Password</Label>
                                <Input
                                    id="new-password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter new password"
                                    disabled={isLoading}
                                    className="bg-white/50 dark:bg-slate-800/50"
                                />
                            </div>
                            <Button
                                onClick={handleChangePassword}
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Changing Password...
                                    </>
                                ) : (
                                    'Change Password'
                                )}
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
};