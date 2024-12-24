import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center relative pt-10">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-100 to-white dark:from-slate-950 dark:to-slate-900" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-emerald-500/5 to-transparent dark:from-cyan-600/20 dark:via-emerald-500/10 dark:to-transparent" />
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(20,184,166,0.1)_0deg,transparent_60deg,transparent_300deg,rgba(20,184,166,0.1)_360deg)] dark:bg-[conic-gradient(from_0deg_at_50%_50%,rgba(20,184,166,0.2)_0deg,transparent_60deg,transparent_300deg,rgba(20,184,166,0.2)_360deg)]" />

            <div className="w-full max-w-6xl flex rounded-2xl overflow-hidden relative backdrop-blur-sm border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/20 dark:shadow-slate-900/30">
                <div className="hidden lg:block w-1/2 relative bg-gradient-to-br from-cyan-500/30 via-emerald-500/20 to-transparent dark:from-cyan-600/40 dark:via-emerald-500/30">
                    <div className="absolute inset-0 bg-white/40 dark:bg-slate-950/40 backdrop-blur-md" />
                    <div className="absolute bottom-8 left-8 text-slate-900 dark:text-white">
                        <h2 className="text-3xl font-bold mb-2">Welcome to ProjectX</h2>
                        <p className="text-lg opacity-90">Join our community of developers and showcase your skills</p>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 p-8 lg:p-12 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg">
                    {children}
                </div>
            </div>
        </div>
    );
};
