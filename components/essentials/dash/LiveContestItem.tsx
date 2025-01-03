import { Button } from "@/components/ui/button"
import { Contest } from "@/types/User";
import { Loader2 } from 'lucide-react'
import { FC } from 'react';

interface LiveContestItemProps {
    icon: FC<{ className?: string }>;
    iconColor: string;
    title: string;
    status: string;
    isLoading: boolean;
    contest: Contest;
}

const LiveContestItem: FC<LiveContestItemProps> = ({ icon: Icon, iconColor, title, status, isLoading, contest }) => {
    const currentTime = new Date();
    const isContestLive = currentTime >= new Date(contest.StartTime) && currentTime <= new Date(contest.EndTime);

    const handleContestJoin = () => {
        if (isContestLive) {
            // will change it to contest window later
            window.open('https://ankushsingh.tech', '_blank');
        } else {
            window.location.href = `/contest/${contest.ID}`;
        }
    }

    return (
        <div className="flex items-center">
            <div className={`w-12 h-12 rounded-full ${iconColor} flex items-center justify-center mr-4`}>
                <Icon className="h-6 w-6" />
            </div>
            <div className="flex-grow">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{status}</p>
            </div>
            <Button onClick={handleContestJoin} disabled={isLoading} variant={isLoading ? "default" : "outline"}>
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Joining...
                    </>
                ) : (
                    isContestLive ? 'Join Now' : 'Details'
                )}
            </Button>
        </div>
    )
}

export default LiveContestItem