'use client';
import { useState } from 'react'
import { Trophy, Users, Gift } from 'lucide-react'
import { useUser } from '@/context/userContext'

import ProfileHeader from './dash/ProfileHeader'
import StatsCard from './dash/StatsCard'
import LiveContests from './dash/LiveContest'
import ActivityChart from './dash/ActivityChart'
import AttendedContests from './dash/AttendedContests'
// import ContestResults from './dash/ContestResults'
// import UpcomingSchedule from './dash/UpcomingSchedule'
// import Achievements from './dash/Achievements'

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
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(false)

  const handleJoinContest = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  const statsCards = [
    { title: "Total Contests", value: user?.Contests?.length || "TBD", change: "+2 from last month", icon: Trophy },
    { title: "Global Ranking", value: user?.GlobalRank || "TBD", change: "Top 5% worldwide", icon: Users },
    { title: "Contest Points", value: user?.CurrentRating || "TBD", change: "+1,254 this week", icon: Gift },
  ]

  return (
    <div className="container mx-auto p-6 space-y-8">
      <ProfileHeader user={user!} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {statsCards.map((card, index) => (
          <StatsCard key={index} {...card} />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <LiveContests onJoinContest={handleJoinContest} isLoading={isLoading} />
        <ActivityChart data={contestActivityData} />
      </div>

      <AttendedContests />

      <div className="grid gap-6 md:grid-cols-2">
        {/* <ContestResults /> */}
        {/* <UpcomingSchedule /> */}
      </div>

      {/* <Achievements /> */}
    </div>
  )
}