import { User } from "@/types/User";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Users, Trophy, ChevronRight, Edit2 } from 'lucide-react';
import { Contest } from "@/types/User";

interface ContestCardProps {
  contest: Contest;
  onEdit: () => void;
  onView?: () => void;
  currentUser: User | null;
}

const STATUS_COLORS = {
  pending: 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20',
  active: 'bg-green-500/10 text-green-500 hover:bg-green-500/20',
  completed: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20',
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
    <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
      {/* Status Badge */}
      <div className="absolute right-4 top-4">
        <Badge className={`${STATUS_COLORS[contest.Status.toLowerCase() as keyof typeof STATUS_COLORS]} capitalize`}>
          {contest.Status}
        </Badge>
      </div>

      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-primary/10 p-2">
            <Trophy className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold leading-none tracking-tight">
              {contest.Name}
            </CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{contest?.Users?.length || 0} Participant{contest?.Users?.length !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 text-sm">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <div className="grid gap-0.5">
                <span className="font-medium">Start:</span>
                <span className="text-muted-foreground">{formatDate(contest.StartTime)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <div className="grid gap-0.5">
                <span className="font-medium">End:</span>
                <span className="text-muted-foreground">{formatDate(contest.EndTime)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between gap-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={onView}
        >
          View Details
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
        {canEdit && (
          <Button
            variant="secondary"
            onClick={onEdit}
            className="flex-none"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ContestCard;