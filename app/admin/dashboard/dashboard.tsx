"use client"

import { useState } from 'react'
import { ContestCard } from '@/components/essentials/cont/contest-card'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from 'next/navigation'
import { Contest } from '@/types/User'
// Mock data for contests
const contests = localStorage.getItem('contests') || [
  { id: '1', name: 'Summer Coding Challenge', status: 'active', startDate: '2023-07-01', endDate: '2023-07-31', participants: 120 },
  { id: '2', name: 'AI Hackathon', status: 'pending', startDate: '2023-08-15', endDate: '2023-08-17', participants: 80 },
  { id: '3', name: 'Web Dev Showdown', status: 'active', startDate: '2023-07-10', endDate: '2023-07-20', participants: 95 },
  { id: '4', name: 'Data Science Cup', status: 'completed', startDate: '2023-06-01', endDate: '2023-06-30', participants: 150 },
  { id: '5', name: 'Mobile App Challenge', status: 'pending', startDate: '2023-09-01', endDate: '2023-09-15', participants: 60 },
]

export function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredContests = contests.filter((contest: Contest) =>
    contest.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === 'all' || contest.status === statusFilter)
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <Input
          placeholder="Search contests..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
        <div className="flex items-center gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => router.push("./create-contest")}>Create New Contest</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContests.map((contest) => (
          <ContestCard key={contest.id} contest={contest} />
        ))}
      </div>
    </div>
  )
}

