import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface ContestFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  onCreateClick: () => void;
}

export const ContestFilters = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  onCreateClick,
}: ContestFiltersProps) => (
  <div className="flex justify-between items-center gap-4">
    <Input
      placeholder="Search contests"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="max-w-xs"
    />
    <Select onValueChange={onStatusChange} defaultValue={statusFilter}>
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
    <Button onClick={onCreateClick}>Create Contest</Button>
  </div>
);