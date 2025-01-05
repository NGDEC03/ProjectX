import { Button } from "@/components/ui/button"
import { Contest } from "@/types/User"
import { Loader2, ExternalLink, ChevronRight } from 'lucide-react'
import { FC } from 'react'

interface LiveContestItemProps {
    icon: FC<{ className?: string }>;
    iconColor: string;
    title: string;
    status: string;
    isLoading: boolean;
    contest: Contest;
}

const LiveContestItem: FC<LiveContestItemProps> = ({ 
    icon: Icon, 
    iconColor, 
    title, 
    status, 
    isLoading, 
    contest 
}) => {
    const currentTime = new Date();
    const isContestLive = currentTime >= new Date(contest.StartTime) && currentTime <= new Date(contest.EndTime);

    const handleContestJoin = () => {
        if (isContestLive) {
            window.open('https://ankushsingh.tech', '_blank');
        } else {
            window.location.href = `/contest/${contest.ID}`;
        }
    }

    return (
        <div className="group relative rounded-lg border p-4 hover:bg-muted/50 transition-all">
            <div className="flex items-center gap-4">
                <div 
                    className={`relative w-12 h-12 rounded-full ${iconColor} flex items-center justify-center 
                    transition-transform group-hover:scale-105`}
                >
                    <Icon className="h-6 w-6" />
                    {isContestLive && (
                        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-900" />
                    )}
                </div>
                
                <div className="flex-grow space-y-1">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                        {isContestLive && (
                            <span className="inline-flex items-center rounded-full bg-green-50 dark:bg-green-900/20 px-2 py-0.5 text-xs font-medium text-green-700 dark:text-green-300">
                                Live
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground">{status}</p>
                </div>

                <Button 
                    onClick={handleContestJoin} 
                    disabled={isLoading}
                    variant={isContestLive ? "default" : "outline"}
                    className="min-w-[100px] transition-all"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            <span>Joining...</span>
                        </>
                    ) : (
                        <>
                            <span>{isContestLive ? 'Join Now' : 'Details'}</span>
                            {isContestLive ? (
                                <ExternalLink className="ml-2 h-4 w-4" />
                            ) : (
                                <ChevronRight className="ml-2 h-4 w-4" />
                            )}
                        </>
                    )}
                </Button>
            </div>
        </div>
    )
}

export default LiveContestItem