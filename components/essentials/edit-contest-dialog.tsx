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
      <DrawerContent className="max-h-[90vh] overflow-y-auto">
        <DrawerHeader className="flex justify-between items-center">
          <DrawerTitle>Edit Contest: {contest.Name}</DrawerTitle>
          <DrawerTitle>Contest Id: {contest.ID}</DrawerTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DrawerHeader>
        <div className="px-4 pb-4">
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