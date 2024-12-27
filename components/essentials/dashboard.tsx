"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Bell, Calendar, ChevronRight, Code, Gift, Globe, Loader2, Trophy, Users } from 'lucide-react'
import { useUser } from '@/context/userContext'

const contestActivityData = [
  { name: 'Mon', value: 2 },
  { name: 'Tue', value: 4 },
  { name: 'Wed', value: 3 },
  { name: 'Thu', value: 5 },
  { name: 'Fri', value: 4 },
  { name: 'Sat', value: 7 },
  { name: 'Sun', value: 6 },
]

export default function Dashboard() {
    const {user,updateUser}=useUser()
    console.log(user);
    
  const [isLoading, setIsLoading] = useState(false)

  const handleJoinContest = () => {
    setIsLoading(true)
    // Simulating API call
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Welcome back, {user?.FirstName?user.FirstName:"User"}</h1>
          <p className="text-gray-600 dark:text-gray-300">Here's what's happening with your contests.</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Avatar>
            <AvatarImage src={user?.Image} alt="@shadcn" />
            <AvatarFallback>CS</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Contests</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Global Ranking</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#42</div>
            <p className="text-xs text-muted-foreground">Top 5% worldwide</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Contest Points</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,854</div>
            <p className="text-xs text-muted-foreground">+1,254 this week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Live & Upcoming Contests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mr-4">
                  <Code className="h-6 w-6 text-red-600 dark:text-red-300" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">AlgoMaster Challenge</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Live now! Ends in 2 hours</p>
                </div>
                <Button onClick={handleJoinContest} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Joining...
                    </>
                  ) : (
                    'Join Now'
                  )}
                </Button>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-4">
                  <Globe className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">Global Coding Sprint</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Starts in 5 days</p>
                </div>
                <Button variant="outline">Details</Button>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
                  <Trophy className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">Weekly Championship</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Starts in 2 days</p>
                </div>
                <Button variant="outline">Details</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Contest Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={contestActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attended Contests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Weekly Sprint #42", date: "July 1, 2023", score: 950, maxScore: 1000, rank: 3 },
              { name: "AlgoMaster June", date: "June 15, 2023", score: 850, maxScore: 1000, rank: 12 },
              { name: "Global Coding Challenge", date: "June 1, 2023", score: 780, maxScore: 1000, rank: 25 },
              { name: "Weekly Sprint #41", date: "May 25, 2023", score: 920, maxScore: 1000, rank: 5 },
              { name: "Data Structures Showdown", date: "May 10, 2023", score: 890, maxScore: 1000, rank: 8 },
            ].map((contest, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex-grow">
                  <h4 className="font-semibold">{contest.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{contest.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{contest.score} / {contest.maxScore}</p>
                  <Badge variant="secondary">Rank #{contest.rank}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Contest Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { contest: "Weekly Sprint #42", rank: "#3", points: 950, date: "2 days ago" },
                { contest: "AlgoMaster June", rank: "#12", points: 850, date: "1 week ago" },
                { contest: "Global Coding Challenge", rank: "#25", points: 780, date: "2 weeks ago" },
              ].map((result, index) => (
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

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Contest Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Weekly Championship</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">July 15, 2023 • 2:00 PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">AlgoMaster July</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">July 22, 2023 • 10:00 AM</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Global Coding Sprint</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">July 29, 2023 • 9:00 AM</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                View Full Schedule
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Contest Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Badge variant="secondary" className="text-sm py-2 px-4">
              <Trophy className="mr-2 h-4 w-4" />
              First Place: AlgoMaster June 2023
            </Badge>
            <Badge variant="secondary" className="text-sm py-2 px-4">
              <Code className="mr-2 h-4 w-4" />
              10 Contest Winning Streak
            </Badge>
            <Badge variant="secondary" className="text-sm py-2 px-4">
              <Users className="mr-2 h-4 w-4" />
              Top 100 Global Ranking
            </Badge>
            <Badge variant="secondary" className="text-sm py-2 px-4">
              <Gift className="mr-2 h-4 w-4" />
              5000 Points Milestone
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

