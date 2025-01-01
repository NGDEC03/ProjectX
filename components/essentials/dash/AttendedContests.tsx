import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AttendedContestItem from "./AttendContestItem"
import { useUser } from "@/context/userContext"

const AttendedContests = () => {
    const {user,updateUser}=useUser()
    const contests = user?.contests || [
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
                        <AttendedContestItem key={index} {...contest}></AttendedContestItem>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default AttendedContests