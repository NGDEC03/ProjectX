import { useEffect, useState } from 'react';
import axios from 'axios';
import { Contest } from '@/types/User';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    CalendarDays,
    Users,
    Trophy,
    Clock,
    BookOpen,
    Code,
    Activity,
    Timer,
    CheckCircle2
} from 'lucide-react';

const STATUS_COLORS = {
    pending: 'bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700',
    active: 'bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700',
    completed: 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700',
} as const;

const ContestDashboard = ({ id }: { id: unknown }) => {
    const [contest, setContest] = useState<Contest | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState<string>('');

    useEffect(() => {
        if (id) {
            const fetchContest = async () => {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/contest/get-one/${id}`);
                    setContest(response.data.contest);
                } catch (error) {
                    console.error('Failed to fetch contest:', error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchContest();
        }
    }, [id]);

    useEffect(() => {
        if (!contest) return;

        const updateTimeLeft = () => {
            const now = new Date().getTime();
            const end = new Date(contest.EndTime).getTime();
            const start = new Date(contest.StartTime).getTime();

            if (now < start) {
                const diff = start - now;
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                setTimeLeft(`Starts in: ${days}d ${hours}h ${minutes}m ${seconds}s`);
            } else if (now < end) {
                const diff = end - now;
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                setTimeLeft(`Time left: ${hours}h ${minutes}m ${seconds}s`);
            } else {
                setTimeLeft('Contest ended');
            }
        };

        const timer = setInterval(updateTimeLeft, 1000);
        updateTimeLeft();

        return () => clearInterval(timer);
    }, [contest]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
            </div>
        );
    }

    if (!contest) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-600 dark:text-slate-400">
                <div className="text-xl font-semibold mb-2">Contest not found</div>
                <p>The contest you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            </div>
        );
    }

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const calculateProgress = () => {
        const now = new Date().getTime();
        const start = new Date(contest.StartTime).getTime();
        const end = new Date(contest.EndTime).getTime();
        const total = end - start;
        const elapsed = now - start;
        return Math.min(Math.max((elapsed / total) * 100, 0), 100);
    };

    return (
        <div className="relative space-y-6 p-6">
            <div className="relative">
                <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {contest.Name}
                                </CardTitle>
                                <CardDescription className="mt-2">
                                    <Badge
                                        className={`${STATUS_COLORS[contest.Status as keyof typeof STATUS_COLORS] || 'bg-gray-500'}`}
                                    >
                                        {contest.Status}
                                    </Badge>
                                </CardDescription>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-semibold text-cyan-600 dark:text-cyan-400">
                                    {timeLeft}
                                </div>
                                <div className="mt-2">
                                    <Progress value={calculateProgress()} className="w-[200px]" />
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-lg bg-cyan-100 dark:bg-cyan-900">
                                    <CalendarDays className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Duration</div>
                                    <div className="font-semibold">3 Hours</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-lg bg-emerald-100 dark:bg-emerald-900">
                                    <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Participants</div>
                                    <div className="font-semibold">{contest?.Users?.length || 0}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900">
                                    <Trophy className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Score</div>
                                    <div className="font-semibold">1000 points</div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Tabs defaultValue="overview" className="mt-6">
                    <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="problems">Problems</TabsTrigger>
                        <TabsTrigger value="submissions">Submissions</TabsTrigger>
                        <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Contest Information</CardTitle>
                                <CardDescription>
                                    Detailed information about the contest schedule and rules
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-slate-500" />
                                            <div>
                                                <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Start Time</div>
                                                <div>{formatDate(contest.StartTime)}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Timer className="h-4 w-4 text-slate-500" />
                                            <div>
                                                <div className="text-sm font-medium text-slate-600 dark:text-slate-400">End Time</div>
                                                <div>{formatDate(contest.EndTime)}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <BookOpen className="h-4 w-4 text-slate-500" />
                                            <div>
                                                <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Problem Count</div>
                                                <div>{contest.Problems?.length || 0} Problems</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-slate-500" />
                                            <div>
                                                <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Scoring Type</div>
                                                <div>ICPC Style</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="problems" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Problem Set</CardTitle>
                                <CardDescription>
                                    Available problems for this contest
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ScrollArea className="h-[400px] pr-4">
                                    {contest.Problems?.map((problem, index) => (
                                        <Card key={problem.ID} className="mb-4 hover:shadow-md transition-shadow">
                                            <CardHeader>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="text-2xl font-bold text-slate-400">{String.fromCharCode(65 + index)}</div>
                                                        <CardTitle className="text-lg">{problem.Title}</CardTitle>
                                                    </div>
                                                    <Badge variant="outline" className="font-mono">
                                                        {problem.Score} points
                                                    </Badge>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
                                                    <div className="flex items-center gap-1">
                                                        <Code className="h-4 w-4" />
                                                        <span>Difficulty: {problem.Difficulty}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Timer className="h-4 w-4" />
                                                        <span>{problem.TimeLimit}ms</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Activity className="h-4 w-4" />
                                                        <span>Rating: {problem.Rating}</span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </ScrollArea>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default ContestDashboard;