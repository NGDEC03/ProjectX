'use client';
import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { ContestCard } from '@/components/essentials/cont/contest-card';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from 'next/navigation';
import { Contest } from '@/types/User';
import { EditContestDrawer } from '@/components/essentials/edit-contest-dialog';
import { toast } from '@/hooks/use-toast';

export default function AdminDashboard() {
  const [userContests, setUserContests] = useState<Contest[]>([]);
  const [otherContests, setOtherContests] = useState<Contest[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchContests();
  }, []);

  const fetchContests = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/contest/get`, {
        withCredentials: true,
      });
      setUserContests(response.data.user_contests || []);
      setOtherContests(response.data.other_contests || []);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast({
        title: "Error",
        description: axiosError.response?.data.message || "An error occurred.",
        variant: "destructive",
      });
    }
  };

  const filteredUserContests = userContests.filter(contest => {
    const matchesSearch = contest.Name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contest.Status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredOtherContests = otherContests.filter(contest => {
    const matchesSearch = contest.Name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contest.Status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
    fetchContests();
    toast({
      title: "Success",
      description: "Contest updated successfully.",
    });
  };

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

      {filteredUserContests.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Contests</h2>
          <div className="grid gap-4">
            {filteredUserContests.map(contest => (
              <ContestCard
                key={contest.ID}
                contest={contest}
                onEdit={() => handleEditContest(contest)}
              />
            ))}
          </div>
        </div>
      )}

      {filteredOtherContests.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Other Contests</h2>
          <div className="grid gap-4">
            {filteredOtherContests.map(contest => (
              <ContestCard
                key={contest.ID}
                contest={contest}
                onEdit={() => handleEditContest(contest)}
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