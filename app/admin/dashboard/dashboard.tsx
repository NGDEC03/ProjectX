"use client"

import { useState, useEffect } from 'react'
import { ContestCard } from '@/components/essentials/cont/contest-card'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from 'next/navigation'
import { Contest } from '@/types/User'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { EditContestForm } from '@/components/essentials/edit-contest-form'
import {X} from 'lucide-react'

// Mock data removed

export function AdminDashboard() {
const contests=[
  { id: '1', name: 'Summer Coding Challenge', status: 'active', startDate: '2023-07-01', endDate: '2023-07-31', participants: 120 },
  { id: '1', name: 'Summer Coding Challenge', status: 'active', startDate: '2023-07-01', endDate: '2023-07-31', participants: 120 },
  { id: '1', name: 'Summer Coding Challenge', status: 'active', startDate: '2023-07-01', endDate: '2023-07-31', participants: 120 },
  { id: '1', name: 'Summer Coding Challenge', status: 'active', startDate: '2023-07-01', endDate: '2023-07-31', participants: 120 },
  { id: '1', name: 'Summer Coding Challenge', status: 'active', startDate: '2023-07-01', endDate: '2023-07-31', participants: 120 },
  
]
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null)
  const router = useRouter()
  const [statusFilter, setStatusFilter] = useState('all')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  

  const filteredContests = contests.filter((contest: Contest) =>
    contest.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === 'all' || contest.status === statusFilter)
  )

  const handleEditContest = (contest: Contest) => {
    setSelectedContest(contest)
    setIsDrawerOpen(true)
  }

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
          <div key={contest.id}>
            <ContestCard contest={contest} />
            <Button 
              variant="outline" 
              className="mt-2 w-full"
              onClick={() => handleEditContest(contest)}
            >
              Edit Contest
            </Button>
          </div>
        ))}
      </div>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
  <DrawerContent className="h-[80vh] max-h-[800px]">
    <DrawerHeader className="flex justify-between items-center border-b">
      <DrawerTitle>Edit Contest: {selectedContest?.name}</DrawerTitle>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsDrawerOpen(false)}
        className="rounded-full"
      >
        <X className="h-4 w-4" />
      </Button>
    </DrawerHeader>
    {selectedContest && (
      <div className="p-4 overflow-y-auto">
        <EditContestForm 
          contestId={parseInt(selectedContest.id)} 
          onSuccess={() => setIsDrawerOpen(false)}
        />
      </div>
    )}
  </DrawerContent>
</Drawer>
    </div>
  )
}
