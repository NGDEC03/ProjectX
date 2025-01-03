'use client';
import { Trophy, Users, Gift } from 'lucide-react';
import { useUser } from '@/context/userContext';
import axios from "axios";
import { useEffect, useState } from "react";
import { Contest } from "@/types/User";

import ProfileHeader from './dash/ProfileHeader';
import StatsCard from './dash/StatsCard';
import LiveContests from './dash/LiveContest';
import AttendedContests from './dash/AttendedContests';
import { useContests } from '@/hooks/useContest';
// import ActivityChart from './dash/ActivityChart';
// import ContestResults from './dash/ContestResults';
// import UpcomingSchedule from './dash/UpcomingSchedule';
// import Achievements from './dash/Achievements';

// const contestActivityData = [
//   { name: 'Mon', value: 2 },
//   { name: 'Tue', value: 4 },
//   { name: 'Wed', value: 3 },
//   { name: 'Thu', value: 5 },
//   { name: 'Fri', value: 4 },
//   { name: 'Sat', value: 7 },
//   { name: 'Sun', value: 6 },
// ];

export default function Dashboard() {
  const { user } = useUser();
  const [isItLoading,] = useState(false);
  const [contests, setContests] = useState<Contest[] | null>(null);
  const { data, isLoading, error } = useContests();

  const statsCards = [
    { title: "Total Contests", value: user?.Contests?.length || "TBD", icon: Trophy },
    { title: "Global Ranking", value: user?.GlobalRank || "TBD", icon: Users },
    { title: "Contest Points", value: user?.CurrentRating || "TBD", icon: Gift },
  ];

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/contest/get`, {
          withCredentials: true,
        });
        const { user_contests } = response.data;
        setContests(user_contests);
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
    };

    fetchContests();
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <ProfileHeader user={user!} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {statsCards.map((card, index) => (
          <StatsCard key={index} {...card} />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {!isLoading && !error && data?.user_contests && <LiveContests contests={data.user_contests} isLoading={isItLoading} />}
        {/* <ActivityChart data={contestActivityData} /> */}
      </div>

      {contests && <AttendedContests contests={contests} />}

      <div className="grid gap-6 md:grid-cols-2">
        {/* <ContestResults /> */}
        {/* <UpcomingSchedule /> */}
      </div>

      {/* <Achievements /> */}
    </div>
  );
}