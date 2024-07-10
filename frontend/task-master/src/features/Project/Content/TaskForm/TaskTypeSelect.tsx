import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select";
import { BookOpenText, Bug, SquareCheck } from "lucide-react";
import Typography from "@/components/Typography";
import { FC } from "react";

type Props = {
  value: string;
  error?: boolean;
  helperText?: string;
  onSelect: (val: string) => void;
};
const TaskTypeSelect: FC<Props> = ({ onSelect, error, helperText, value }) => {
  return (
    <div>
      <Select value={value} onValueChange={onSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Select type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="BUG">
              <div className="flex gap-2 items-center">
                <Bug className="h-5 w-5" />
                <Typography variant="h6">Bug</Typography>
              </div>
            </SelectItem>
            <SelectItem value="FEATURE">
              <div className="flex gap-2 items-center">
                <BookOpenText className="h-5 w-5" />
                <Typography variant="h6">Feature</Typography>
              </div>
            </SelectItem>
            <SelectItem value="TASK">
              <div className="flex gap-2 items-center">
                <SquareCheck className="h-5 w-5" />
                <Typography variant="h6">Task</Typography>
              </div>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && helperText && (
        <Typography variant="h6" className="text-destructive">
          {helperText}
        </Typography>
      )}
    </div>
  );
};

export default TaskTypeSelect;
