import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AttendedContestItem from "./AttendContestItem"

const AttendedContests = () => {
    const contests = [
        { name: "Weekly Sprint #42", date: "July 1, 2023", score: 950, maxScore: 1000, rank: 3 },
        { name: "AlgoMaster June", date: "June 15, 2023", score: 850, maxScore: 1000, rank: 12 },
        { name: "Global Coding Challenge", date: "June 1, 2023", score: 780, maxScore: 1000, rank: 25 },
        { name: "Weekly Sprint #41", date: "May 25, 2023", score: 920, maxScore: 1000, rank: 5 },
        { name: "Data Structures Showdown", date: "May 10, 2023", score: 890, maxScore: 1000, rank: 8 },
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Attended Contests</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {contests.map((contest, index) => (
                        <AttendedContestItem key={index} {...contest} />
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default AttendedContests