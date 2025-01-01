import { Badge } from "@/components/ui/badge";

interface AttendedContestItemProps {
    contestName: string|undefined; // Corresponds to `contest.name` in UserContest
    startTime: string; // Corresponds to `startTime` in UserContest, formatted as a string
    score: number; // From UserContest
    rank: number; // From UserContest
    status: 'registered' | 'started' | 'finished'; // From UserContest
}

const AttendedContestItem = ({ contestName, startTime, score, rank, status }: AttendedContestItemProps) => {
    return (
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex-grow">
                <h4 className="font-semibold">{contestName}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{startTime}</p>
                <p className="text-xs text-gray-500">Status: {status}</p>
            </div>
            <div className="text-right">
                <p className="font-semibold">{score}</p>
                <Badge variant="secondary">Rank #{rank}</Badge>
            </div>
        </div>
    );
};

export default AttendedContestItem;
