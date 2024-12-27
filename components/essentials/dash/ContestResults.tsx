import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const ContestResults = () => {
    const results = [
        { contest: "Weekly Sprint #42", rank: "#3", points: 950, date: "2 days ago" },
        { contest: "AlgoMaster June", rank: "#12", points: 850, date: "1 week ago" },
        { contest: "Global Coding Challenge", rank: "#25", points: 780, date: "2 weeks ago" },
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Contest Results</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {results.map((result, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div>
                                <h4 className="font-semibold">{result.contest}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Rank: {result.rank} • {result.date}</p>
                            </div>
                            <Badge variant="secondary">{result.points} pts</Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default ContestResults