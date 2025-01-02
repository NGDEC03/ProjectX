import { useUser } from "@/context/userContext"; 
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Users } from 'lucide-react';
import { Contest } from "@/types/User";

interface ContestCardProps {
  contest: Contest;
  onEdit: () => void;
}

export function ContestCard({ contest, onEdit }: ContestCardProps) {
  const { user } = useUser();
  const canEdit = user?.ID === contest.CreatorID;

  const statusColors: Record<string, string> = {
    active: 'bg-green-500',
    pending: 'bg-yellow-500',
    completed: 'bg-blue-500',
  };

  return (
    <Card className="relative">
      <Badge 
        className={`absolute top-2 right-2 ${statusColors[contest.Status] || 'bg-gray-500'}`}
      >
        {contest.Status}
      </Badge>
      <CardHeader>
        <CardTitle className="text-xl">{contest.Name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          <div className="text-sm">
            <p>Start: {new Date(contest.StartTime).toLocaleString()}</p>
            <p>End: {new Date(contest.EndTime).toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span className="text-sm">{contest.Users?.length || 0} Participants</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">View Details</Button>
        {canEdit && (
          <Button variant="outline" size="sm" onClick={onEdit}>
            Edit
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}