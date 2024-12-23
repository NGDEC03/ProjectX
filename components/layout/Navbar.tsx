import { Laptop, Home, Settings, GitBranch, Award, MessageCircle } from 'lucide-react';
import { ModeToggle } from '@/components/ui/ModeToggle';
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between p-6 fixed z-50 top-5 w-full">
            <Link href={'/'} className="flex items-center gap-2">
                <Laptop className="w-6 h-6" />
                <span className="text-xl font-semibold">ProjectX</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
                <div className="cursor-pointer flex items-center gap-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                </div>
                <div className="cursor-pointer flex items-center gap-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    <Settings className="w-4 h-4" />
                    <span>Contests</span>
                </div>
                <div className="cursor-pointer flex items-center gap-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    <GitBranch className="w-4 h-4" />
                    <span>Leaderboard</span>
                </div>
                <div className="cursor-pointer flex items-center gap-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    <Award className="w-4 h-4" />
                    <span>Rewards</span>
                </div>
                <div className="cursor-pointer flex items-center gap-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span>Community</span>
                </div>
                <div className="cursor-pointer flex items-center gap-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    <ModeToggle />
                </div>
            </div>
        </nav>
    )
}

export default Navbar