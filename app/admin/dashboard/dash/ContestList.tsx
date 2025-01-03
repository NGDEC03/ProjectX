import { Contest } from '@/types/User';
import { ContestCard } from '@/components/essentials/cont/contest-card';
import { useUser } from '@/context/userContext';

interface ContestListProps {
  title: string;
  contests: Contest[];
  onEdit: (contest: Contest) => void;
}

export const ContestList = ({ title, contests, onEdit }: ContestListProps) => {

  const { user } = useUser();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="grid gap-4">
        {contests.map((contest) => (
          <ContestCard key={contest.ID} contest={contest} currentUser={user} onEdit={() => onEdit(contest)} />
        ))}
      </div>
    </div>
  )
};