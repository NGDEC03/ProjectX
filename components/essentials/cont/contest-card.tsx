import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, Users } from 'lucide-react'

interface ContestCardProps {
  contest: {
    id: string
    name: string
    status: 'active' | 'pending' | 'completed'
    startDate: string
    endDate: string
    participants: number
  }
}

export function ContestCard({ contest }: ContestCardProps) {
  const statusColors = {
    active: 'bg-green-500',
    pending: 'bg-yellow-500',
    completed: 'bg-blue-500'
  }

  return (
    <Card className="relative">
      <Badge className={`absolute top-2 right-2 ${statusColors[contest.status]}`}>
        {contest.status}
      </Badge>
      <CardHeader>
        <CardTitle>{contest.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center">
          <CalendarDays className="mr-2 h-4 w-4" />
          <span className="text-sm">
            {new Date(contest.startDate).toLocaleDateString()} - {new Date(contest.endDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center">
          <Users className="mr-2 h-4 w-4" />
          <span className="text-sm">{contest.participants} participants</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">View Details</Button>
        <Button variant="outline" size="sm">Edit</Button>
      </CardFooter>
    </Card>
  )
}

