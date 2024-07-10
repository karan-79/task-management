import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import { Button } from "@/components/Button";
import { FC, useState } from "react";
import { EllipsisVertical, Trash } from "lucide-react";

type Props = {
  onDelete: () => void;
  onUpdate: () => void;
};
const TaskContextMenu: FC<Props> = ({ onDelete, onUpdate }) => {
  const [open, setOpen] = useState(false);
  const handleDelete = () => {
    onDelete();
    setOpen(false);
  };

  const handleUpdate = () => {
    onUpdate();
    setOpen(false);
  };
  return (
    <Popover onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost" className="ml-auto">
          <EllipsisVertical className="rotate-90" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-2">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-grow"
            onClick={handleUpdate}
          >
            Update
          </Button>
          <Button variant="destructive" size="icon" onClick={handleDelete}>
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TaskContextMenu;
