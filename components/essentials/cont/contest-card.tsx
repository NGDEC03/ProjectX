import { User } from "@/types/User";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Users } from 'lucide-react';
import { Contest } from "@/types/User";

interface ContestCardProps {
  contest: Contest;
  onEdit: () => void;
  onView?: () => void;
  currentUser: User | null;
}

const STATUS_COLORS = {
  pending: 'bg-yellow-500 hover:bg-yellow-600',
  active: 'bg-green-500 hover:bg-green-600',
  completed: 'bg-blue-500 hover:bg-blue-600',
} as const;

export function ContestCard({ contest, onEdit, onView, currentUser }: ContestCardProps) {
  const canEdit = currentUser?.ID === contest.CreatorID;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="relative hover:shadow-md transition-shadow duration-200">
      <Badge
        className={`absolute top-2 right-2 ${STATUS_COLORS[contest.Status as keyof typeof STATUS_COLORS] || 'bg-gray-500'}`}
      >
        {contest.Status}
      </Badge>

      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900 pr-24">
          {contest.Name}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-600">
            <CalendarDays className="h-4 w-4" />
            <div className="text-sm space-y-1">
              <p className="flex items-center">
                <span className="font-medium">Start:</span>
                <span className="ml-2">{formatDate(contest.StartTime)}</span>
              </p>
              <p className="flex items-center">
                <span className="font-medium">End:</span>
                <span className="ml-2">{formatDate(contest.EndTime)}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Users className="h-4 w-4" />
            <span className="text-sm">
              {contest?.Users?.length} Participant{contest?.Users?.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={onView}
        >
          View Details
        </Button>
        {canEdit && (
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            className="flex-1"
          >
            Edit
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}