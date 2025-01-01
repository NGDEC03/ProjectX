import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AttendedContestItem from "./AttendContestItem"
import { useUser } from "@/context/userContext"

const AttendedContests = () => {
    const {user}=useUser()
    const contests = user?.Contests|| [
        { name: "Data Incoming", date: "July 1, 2023", score: 950, maxScore: 1000, rank: 3 },
         ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Attended Contests</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {contests.map((contest, index) => (
                        <AttendedContestItem 
                            key={index} 
                            contestName={contest.name} 
                            startTime={contest.date} 
                            score={contest.score} 
                            rank={contest.rank} 
                            status="Completed" 
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default AttendedContests