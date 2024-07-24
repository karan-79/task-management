import { TaskForm } from "@/features/Project/Content/TaskForm/types.ts";
import { FC } from "react";
import Typography from "@/components/Typography";
import TaskTypeBadge from "@/features/Project/Content/TasksTable/TaskTypeBadge.tsx";
import PriorityBadge from "@/features/Project/Content/TasksTable/PriorityBadge.tsx";
import { Badge } from "@/components/Badge";
import PersonAvatarLabel from "@/features/components/PersonAvatarLabel.tsx";
import { isNil } from "lodash";

const TaskDetailsView: FC<TaskForm> = ({
  taskType,
  priority,
  storyPoints,
  title,
  status,
  description,
  estimateMinutes,
  estimateDays,
  assignee,
}) => {
  return (
    <div className="flex flex-col gap-4 mt-4 p-2">
      <Typography variant="h3">{title}</Typography>
      <div className="flex items-center justify-between">
        <div>
          <Badge>{status}</Badge>
        </div>
        <div>{assignee && <PersonAvatarLabel person={assignee} />}</div>
      </div>
      <div className="flex gap-4">
        <TaskTypeBadge type={taskType} />
        <PriorityBadge priority={priority} />
        {!isNil(storyPoints) && (
          <Badge variant="secondary">{"Story points " + storyPoints}</Badge>
        )}
        {estimateDays && (
          <Badge variant="secondary">{"Est. days " + estimateDays}</Badge>
        )}
      </div>
      <div>
        <Typography variant="p" className="mt-2 text-wrap">
          {description}
        </Typography>
      </div>
    </div>
  );
};

export default TaskDetailsView;
