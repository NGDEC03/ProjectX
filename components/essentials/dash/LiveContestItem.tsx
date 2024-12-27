import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'

import { FC } from 'react';

interface LiveContestItemProps {
    icon: FC<{ className?: string }>;
    iconColor: string;
    title: string;
    status: string;
    onJoin: () => void;
    isLoading: boolean;
}

const LiveContestItem: FC<LiveContestItemProps> = ({ icon: Icon, iconColor, title, status, onJoin, isLoading }) => {
    return (
        <div className="flex items-center">
            <div className={`w-12 h-12 rounded-full ${iconColor} flex items-center justify-center mr-4`}>
                <Icon className="h-6 w-6" />
            </div>
            <div className="flex-grow">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{status}</p>
            </div>
            <Button onClick={onJoin} disabled={isLoading} variant={isLoading ? "default" : "outline"}>
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Joining...
                    </>
                ) : (
                    title === 'AlgoMaster Challenge' ? 'Join Now' : 'Details'
                )}
            </Button>
        </div>
    )
}

export default LiveContestItem