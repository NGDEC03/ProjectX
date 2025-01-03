import Link from "next/link";

const HeroSection = () => {
    return (
        <div className="min-h-screen text-slate-900 dark:text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-100 to-white dark:from-slate-950 dark:to-slate-900" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-emerald-500/5 to-transparent dark:from-cyan-600/20 dark:via-emerald-500/10 dark:to-transparent" />
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(20,184,166,0.1)_0deg,transparent_60deg,transparent_300deg,rgba(20,184,166,0.1)_360deg)] dark:bg-[conic-gradient(from_0deg_at_50%_50%,rgba(20,184,166,0.2)_0deg,transparent_60deg,transparent_300deg,rgba(20,184,166,0.2)_360deg)]" />

            <div className="relative flex items-center justify-center min-h-screen">
                <div className="max-w-6xl mx-auto px-4 py-20 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400 text-transparent bg-clip-text">
                        Compete, Create,<br />
                        Conquer with<br />
                        ProjectX
                    </h1>

                    <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl max-w-3xl mx-auto mb-10">
                        Join the ultimate coding competition platform where developers showcase their skills,
                        solve challenging problems, and climb the global rankings in real-time contests.
                    </p>

                    <div className="flex gap-4 justify-center mb-20">
                        <Link href={'/dashboard'} className="bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-500 dark:to-cyan-500 text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
                            View Contests
                        </Link>
                        <Link href={'/dashboard'} className="bg-slate-200 dark:bg-slate-800 px-8 py-3 rounded-full font-semibold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                            Practice Now
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HeroSection;