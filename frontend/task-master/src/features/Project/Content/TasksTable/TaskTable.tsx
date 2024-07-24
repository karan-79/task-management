import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table";
import { Avatar, AvatarFallback } from "@/components/Avatar/Avatar.tsx";
import { getInitials } from "@/features/Project/Content/TasksTable/utils.tsx";
import { FC, useState } from "react";
import { APIProjectTasks } from "@/service/types.ts";
import { useFetchWithLoading } from "@/hooks/useFetchWithLoading.ts";
import { getTasksForProject } from "@/service/projectService.ts";
import { isNil } from "lodash";
import { Badge } from "@/components/Badge";
import PriorityBadge from "@/features/Project/Content/TasksTable/PriorityBadge.tsx";
import TaskTypeBadge from "@/features/Project/Content/TasksTable/TaskTypeBadge.tsx";
import {
  isTaskSheetOpenForView,
  TaskSheetState,
} from "@/features/Project/Content/Board/types.ts";
import UpdateTaskSheet from "@/features/Project/Content/TaskForm/UpdateTaskSheet.tsx";
import TaskFormProvider from "@/features/Project/Content/TaskForm/TaskFormProvider";

type Props = {
  projectId: string;
};
const TaskTable: FC<Props> = ({ projectId }) => {
  const { isLoading, data: tasks } = useFetchWithLoading<APIProjectTasks[]>({
    fetchFn: () => getTasksForProject(projectId),
    initialState: [],
  });

  const [sheetState, setSheetState] = useState<TaskSheetState>({
    __tag: "CLOSE",
  });

  return (
    <>
      <Table>
        <TableHeader className="bg-accent">
          <TableHead>Id</TableHead>
          <TableHead>Assignee</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Priority</TableHead>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => {
            return (
              <TableRow
                key={task.taskId}
                onClick={() => {
                  setSheetState({
                    __tag: "OPEN",
                    state: "UPDATE",
                    id: task.taskId,
                  });
                }}
              >
                <TableCell>{task.taskId}</TableCell>
                <TableCell>
                  <div className="flex gap-2 items-center">
                    <Avatar>
                      <AvatarFallback>
                        {isNil(task.assignee)
                          ? "N/A"
                          : getInitials(task.assignee)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>
                  <Badge>{task.status}</Badge>
                </TableCell>
                <TableCell>
                  <TaskTypeBadge type={task.type} />
                </TableCell>
                <TableCell>
                  <PriorityBadge priority={task.priority} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {isTaskSheetOpenForView(sheetState) && (
        <TaskFormProvider>
          <UpdateTaskSheet
            taskId={sheetState.id}
            open={true}
            onClose={() => setSheetState({ __tag: "CLOSE" })}
          />
        </TaskFormProvider>
      )}
    </>
  );
};

export default TaskTable;
