import { Badge } from "@/components/Badge";
import { getIconForType } from "@/features/Project/Content/TasksTable/utils.tsx";
import { TaskType } from "@/features/Project/types.ts";
import { FC } from "react";

type Props = {
  type: TaskType;
};

const TaskTypeBadge: FC<Props> = ({ type }) => {
  return (
    <Badge variant="outline">
      <div className="flex items-center gap-2">
        {getIconForType(type)}
        <p>{type}</p>
      </div>
    </Badge>
  );
};

export default TaskTypeBadge;
