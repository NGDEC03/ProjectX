import axios from "axios"
import { useEffect, useState } from "react"
// import { useUser } from "@/context/userContext"
import { Contest } from "@/types/User"
import AttendedContestItem from "./AttendContestItem"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const AttendedContests = () => {
    // const { user } = useUser()

    const [contests, setContests] = useState<Contest[] | null>(null)

    useEffect(() => {
        const fetchContests = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/contest/get`, {
                    withCredentials: true,
                })
                const { user_contests } = response.data
                setContests(user_contests)
            } catch (error) {
                console.error("Error fetching contests:", error)
            }
        }

        fetchContests();
    }, [])

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