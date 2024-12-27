import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Globe, Trophy } from 'lucide-react'
import LiveContestItem from "./LiveContestItem"

interface LiveContestsProps {
    onJoinContest: () => void;
    isLoading: boolean;
}

const LiveContests = ({ onJoinContest, isLoading }: LiveContestsProps) => {
    const contests = [
        {
            icon: Code,
            iconColor: "bg-red-100 dark:bg-red-900",
            title: "AlgoMaster Challenge",
            status: "Live now! Ends in 2 hours"
        },
        {
            icon: Globe,
            iconColor: "bg-purple-100 dark:bg-purple-900",
            title: "Global Coding Sprint",
            status: "Starts in 5 days"
        },
        {
            icon: Trophy,
            iconColor: "bg-blue-100 dark:bg-blue-900",
            title: "Weekly Championship",
            status: "Starts in 2 days"
        }
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Live & Upcoming Contests</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {contests.map((contest, index) => (
                        <LiveContestItem
                            key={index}
                            {...contest}
                            onJoin={onJoinContest}
                            isLoading={isLoading && contest.title === "AlgoMaster Challenge"}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default LiveContests