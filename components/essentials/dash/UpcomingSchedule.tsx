import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronRight } from 'lucide-react'

const UpcomingSchedule = () => {
    const events = [
        { name: "Weekly Championship", date: "July 15, 2023", time: "2:00 PM" },
        { name: "AlgoMaster July", date: "July 22, 2023", time: "10:00 AM" },
        { name: "Global Coding Sprint", date: "July 29, 2023", time: "9:00 AM" },
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Upcoming Contest Schedule</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {events.map((event, index) => (
                        <div key={index} className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">{event.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{event.date} • {event.time}</p>
                            </div>
                        </div>
                    ))}
                    <Button variant="outline" className="w-full">
                        View Full Schedule
                        <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default UpcomingSchedule