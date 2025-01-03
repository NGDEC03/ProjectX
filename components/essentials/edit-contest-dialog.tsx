import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Contest } from "@/types/User";
import { EditContestForm } from "./edit-contest";

interface EditContestDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  contest: Contest | null;
  onSuccess: () => void;
}

export function EditContestDrawer({ isOpen, onClose, contest, onSuccess }: EditContestDrawerProps) {
  if (!contest) return null;

  return (
    <Drawer open={isOpen} onOpenChange={open => !open && onClose()}>
      <DrawerContent className="h-[90vh] flex flex-col">
        <DrawerHeader className="flex justify-between items-center border-b">
          <div className="flex flex-col gap-2">
            <DrawerTitle>Edit Contest: {contest.Name}</DrawerTitle>
            <span className="text-sm text-muted-foreground">Contest Id: {contest.ID}</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <EditContestForm
            contestId={contest.ID}
            onSuccess={onSuccess}
            onClose={onClose}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}