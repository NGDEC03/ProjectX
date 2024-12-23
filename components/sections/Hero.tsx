import { Laptop, Home, Settings, GitBranch, Award, MessageCircle } from 'lucide-react';

const HeroSection = () => {
    return (
        <div className="min-h-screen text-slate-900 dark:text-white relative overflow-hidden">
            {/* Background with smoother gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-emerald-500/5 to-transparent dark:from-emerald-500/20 dark:via-emerald-500/5 dark:to-transparent" />

            {/* Content */}
            <div className="relative">
                {/* Navigation */}
                <nav className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-2">
                        <Laptop className="w-6 h-6" />
                        <span className="text-xl font-semibold">ProjectX</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex items-center gap-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                            <Home className="w-4 h-4" />
                            <span>Home</span>
                        </div>
                        <div className="flex items-center gap-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                            <Settings className="w-4 h-4" />
                            <span>Contests</span>
                        </div>
                        <div className="flex items-center gap-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                            <GitBranch className="w-4 h-4" />
                            <span>Leaderboard</span>
                        </div>
                        <div className="flex items-center gap-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                            <Award className="w-4 h-4" />
                            <span>Rewards</span>
                        </div>
                        <div className="flex items-center gap-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                            <span>Community</span>
                        </div>
                    </div>
                </nav>

                {/* Hero Content */}
                <div className="max-w-6xl mx-auto px-4 py-20 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Compete, Create,<br />
                        Conquer with<br />
                        ProjectX
                    </h1>

                    <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl max-w-3xl mx-auto mb-10">
                        Join the ultimate coding competition platform where developers showcase their skills,
                        solve challenging problems, and climb the global rankings in real-time contests.
                    </p>

                    <div className="flex gap-4 justify-center mb-20">
                        <button className="bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 transition-colors">
                            Join Contest
                        </button>
                        <button className="bg-slate-200 dark:bg-slate-800 px-8 py-3 rounded-full font-semibold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                            Practice Now
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                        <div className="text-center">
                            <div className="text-5xl font-bold mb-2">50K+</div>
                            <div className="text-slate-600 dark:text-slate-300">Active Developers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold mb-2">1000+</div>
                            <div className="text-slate-600 dark:text-slate-300">Daily Challenges</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold mb-2">100+</div>
                            <div className="text-slate-600 dark:text-slate-300">Global Contests</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;