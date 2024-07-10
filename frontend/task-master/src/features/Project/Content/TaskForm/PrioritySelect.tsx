import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select";
import { ChevronsDown, ShieldAlert } from "lucide-react";
import Typography from "@/components/Typography";
import { FC } from "react";
import { TaskPriority } from "@/features/Project/types.ts";

type Props = {
  value: TaskPriority;
  onSelect: (val: string) => void;
};

const PrioritySelect: FC<Props> = ({ onSelect, value }) => {
  return (
    <Select value={value} onValueChange={onSelect}>
      <SelectTrigger>
        <SelectValue placeholder="Select priority" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="URGENT">
            <div className="flex gap-2 items-center">
              <ShieldAlert className="h-5 w-5" />
              <Typography variant="h6">Urgent</Typography>
            </div>
          </SelectItem>
          <SelectItem value="HIGH">
            <div className="flex gap-2 items-center">
              <ChevronsDown className="h-5 w-5 rotate-180" />
              <Typography variant="h6">High</Typography>
            </div>
          </SelectItem>
          <SelectItem value="LOW">
            <div className="flex gap-2 items-center">
              <ChevronsDown className="h-5 w-5" />
              <Typography variant="h6">Low</Typography>
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default PrioritySelect;
