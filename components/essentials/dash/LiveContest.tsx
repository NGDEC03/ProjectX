import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy } from 'lucide-react'
import LiveContestItem from "./LiveContestItem"
import { Contest } from "@/types/User";

interface LiveContestsProps {
    isLoading: boolean;
    contests: Contest[];
}

const LiveContests = ({ isLoading, contests }: LiveContestsProps) => {
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
                            contest={contest}
                            isLoading={isLoading && contest.Name === "AlgoMaster Challenge"}
                            icon={Trophy}
                            iconColor="gold"
                            title={contest.Name}
                            status="active"
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default LiveContests