import { Contest } from "@/types/User"
import AttendedContestItem from "./AttendContestItem"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const AttendedContests = ({contests} : {contests : Contest[]}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Attended Contests</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {contests && contests.map((contest, index) => (
                        <AttendedContestItem
                            key={index}
                            {...contest}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default AttendedContests