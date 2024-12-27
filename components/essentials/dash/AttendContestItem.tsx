import { Badge } from "@/components/ui/badge"

interface AttendedContestItemProps {
    name: string;
    date: string;
    score: number;
    maxScore: number;
    rank: number;
}

const AttendedContestItem = ({ name, date, score, maxScore, rank }: AttendedContestItemProps) => {
    return (
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex-grow">
                <h4 className="font-semibold">{name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{date}</p>
            </div>
            <div className="text-right">
                <p className="font-semibold">{score} / {maxScore}</p>
                <Badge variant="secondary">Rank #{rank}</Badge>
            </div>
        </div>
    )
}

export default AttendedContestItem