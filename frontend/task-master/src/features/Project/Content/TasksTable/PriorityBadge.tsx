import { TaskPriority } from "@/features/Project/types.ts";
import { FC } from "react";
import { Badge } from "@/components/Badge";
import { getIconForPriority } from "@/features/Project/Content/TasksTable/utils.tsx";

type Props = {
  priority: TaskPriority;
};
const PriorityBadge: FC<Props> = ({ priority }) => {
  return (
    <Badge variant="outline">
      <div className="flex items-center gap-2">
        {getIconForPriority(priority)}
        <p>{priority}</p>
      </div>
    </Badge>
  );
};

export default PriorityBadge;
