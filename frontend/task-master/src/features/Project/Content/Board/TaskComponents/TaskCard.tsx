import { Task } from "@/features/Project/types.ts";
import { FC } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import { Avatar, AvatarFallback } from "@/components/Avatar/Avatar.tsx";
import { Draggable } from "@hello-pangea/dnd";
import { getInitials } from "../../TasksTable/utils.tsx";
import TaskContextMenu from "@/features/Project/Content/Board/TaskComponents/TaskContextMenu.tsx";
import { deleteTask } from "@/service/taskService.ts";

type Props = {
  task: Task;
  index: number;
  onUpdate: () => void;
};

const TaskCard: FC<Props> = ({ task, index, onUpdate }) => {
  const handleDelete = () => {};

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Card className="mb-2 hover:shadow-md transition-shadow duration-200 dark:hover:shadow-2xl">
              <CardHeader className="px-4 py-2">
                <div className="flex items-center">
                  <CardTitle
                    variant="h5"
                    className="text-wrap leading-tight text-ellipsis overflow-hidden line-clamp-2"
                  >
                    {task.title}
                  </CardTitle>
                  <TaskContextMenu
                    onDelete={handleDelete}
                    onUpdate={onUpdate}
                  />
                </div>
              </CardHeader>
              <CardContent className="px-4 py-2">
                <div className="flex flex-col text-sm text-muted-foreground">
                  {task.storyPoints && (
                    <span>Story Points: {task.storyPoints}</span>
                  )}
                  {task.estimateDays && (
                    <span>
                      Estimate: {task.estimateDays} day
                      {task.estimateDays > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="px-4 py-2 flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{task.id}</span>
                <div className="ml-auto flex">
                  <Avatar>
                    <AvatarFallback>
                      {task.assignee ? getInitials(task.assignee) : "?"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </CardFooter>
            </Card>
          </div>
        );
      }}
    </Draggable>
  );
};

export default TaskCard;
