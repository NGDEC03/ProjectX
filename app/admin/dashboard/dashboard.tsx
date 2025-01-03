'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Contest } from '@/types/User';
import { useContests } from '@/hooks/useContest';
import { useUser } from '@/context/userContext';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ContestCard } from '@/components/essentials/cont/contest-card'; 
import { EditContestDrawer } from '@/components/essentials/edit-contest-dialog';
import { toast } from '@/hooks/use-toast';

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const router = useRouter();
  const { user } = useUser();
  const { data, isLoading, error } = useContests();

  const filterContests = (contests: Contest[] = []) => {
    return contests.filter(contest => {
      const matchesSearch = contest.Name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || contest.Status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

  const filteredContests = filterContests(data?.user_contests || []);
  const userContests = filteredContests.filter(contest => contest.CreatorID === user?.ID);
  const otherContests = filteredContests.filter(contest => contest.CreatorID !== user?.ID);

  const handleEditContest = (contest: Contest) => {
    setSelectedContest(contest);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedContest(null);
  };

  const handleEditSuccess = () => {
    handleDrawerClose();
    toast({
      title: "Success",
      description: "Contest updated successfully.",
    });
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen w-full">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error loading contests
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center gap-4">
        <Input
          placeholder="Search contests"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
        <Select onValueChange={setStatusFilter} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => router.push('/admin/create-contest')}>
          Create Contest
        </Button>
      </div>

      {userContests.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Contests</h2>
          <div className="grid gap-4">
            {userContests.map(contest => (
              <ContestCard
                key={contest.ID}
                contest={contest}
                onEdit={() => handleEditContest(contest)}
                onView={() => router.push(`/contest/${contest.ID}`)}
                currentUser={user}
              />
            ))}
          </div>
        </div>
      )}

      {otherContests.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Other Contests</h2>
          <div className="grid gap-4">
            {otherContests.map(contest => (
              <ContestCard
                key={contest.ID}
                contest={contest}
                onEdit={() => handleEditContest(contest)}
                onView={() => router.push(`/contest/${contest.ID}`)}
                currentUser={user}
              />
            ))}
          </div>
        </div>
      )}

      <EditContestDrawer
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        contest={selectedContest}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
}