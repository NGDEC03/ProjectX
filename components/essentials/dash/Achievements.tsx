import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Code, Users, Gift } from 'lucide-react'

const Achievements = () => {
    const achievements = [
        { icon: Trophy, text: "First Place: AlgoMaster June 2023" },
        { icon: Code, text: "10 Contest Winning Streak" },
        { icon: Users, text: "Top 100 Global Ranking" },
        { icon: Gift, text: "5000 Points Milestone" },
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Contest Achievements</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-4">
                    {achievements.map((achievement, index) => (
                        <Badge key={index} variant="secondary" className="text-sm py-2 px-4">
                            <achievement.icon className="mr-2 h-4 w-4" />
                            {achievement.text}
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default Achievements