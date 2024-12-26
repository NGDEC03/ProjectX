'use client';
import { Laptop, Home, Settings, GitBranch, Award, MessageCircle, KeySquare, LogOutIcon } from 'lucide-react';
import { ModeToggle } from '@/components/ui/ModeToggle';
import Link from 'next/link';
import { useUser } from '@/context/userContext';
import axios, { AxiosError } from 'axios';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
    const { user, setUser } = useUser();
    const { toast } = useToast();
    const handleLogin = async () => {
        if (user) {
            try {
                await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/signout`, {
                    withCredentials: true
                });
                setUser(null);
                toast({
                    title: 'Success',
                    description: 'You have been signed out',
                    duration: 3000
                });
            } catch (error) {
                const axiosError = error as AxiosError<{ message: string }>;
                toast({
                    title: 'Error',
                    description: axiosError.response?.data.message || 'An error occurred',
                    variant: 'destructive',
                    duration: 3000
                });
                console.error('Error during sign out:', error);
            }
        }
    }
    return (
        <div className="fixed z-50 top-5 w-full px-6">
            <nav className="max-w-7xl mx-auto relative backdrop-blur-sm rounded-full border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 shadow-lg shadow-slate-200/20 dark:shadow-slate-900/30 p-4">
                <div className="absolute inset-0 rounded-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-emerald-500/5 dark:from-cyan-500/10 dark:to-emerald-500/10" />
                    <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(20,184,166,0.05)_0deg,transparent_60deg,transparent_300deg,rgba(20,184,166,0.05)_360deg)] dark:bg-[conic-gradient(from_0deg_at_50%_50%,rgba(20,184,166,0.1)_0deg,transparent_60deg,transparent_300deg,rgba(20,184,166,0.1)_360deg)]" />
                </div>

                <div className="relative flex items-center justify-between">
                    <Link
                        href={'/'}
                        className="flex items-center gap-2 text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                    >
                        <Laptop className="w-6 h-6" />
                        <span className="text-xl font-semibold bg-gradient-to-r from-cyan-500 to-emerald-500 dark:from-cyan-400 dark:to-emerald-400 bg-clip-text text-transparent">
                            {user?.FirstName || 'CodeStrike'}
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {[
                            { icon: Home, label: 'Home' },
                            { icon: Settings, label: 'Contests' },
                            { icon: GitBranch, label: 'Leaderboard' },
                            { icon: Award, label: 'Rewards' },
                            { icon: MessageCircle, label: 'Community' },
                            { icon: user ? LogOutIcon : KeySquare, label: user ? 'Logout' : 'Login', link: '/auth/signin', onClick: handleLogin }
                        ].map((item, index) => (
                            <Link
                                key={index}
                                onClick={item.onClick ? item.onClick : () => { }}
                                href={item.link ? item.link : '#'}
                                className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all hover:scale-105"
                            >
                                <item.icon className="w-4 h-4" />
                                <span className="text-sm font-medium">{item.label}</span>
                            </Link>
                        ))}
                        <div className="pl-2 border-l border-slate-200 dark:border-slate-800">
                            <ModeToggle />
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;