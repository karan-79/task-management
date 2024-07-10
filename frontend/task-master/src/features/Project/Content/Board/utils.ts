import { UpdateTaskSortIndexRequest } from "@/service/types";
import { Column, Task } from "../../types";

export const groupTasksByStatus = (tasks: Task[]) => {
  return tasks.reduce(
    (acc, curr: Task) => {
      if (acc[curr.status]) {
        acc[curr.status].push(curr);
        return acc;
      }

      acc[curr.status] = [curr];
      return acc;
    },
    {} as Record<string, Task[]>,
  );
};

export const toUpdatedSortIndexRequest = (
  task: Task,
): UpdateTaskSortIndexRequest => ({
  taskId: task.id,
  sortIndex: task.sortIndex!,
});

export const getDeletedColumnState = (columns: Column[], deletedId: number) => {
  const newColumns = Array.from(columns);
  const deletedCol = newColumns.find((c) => c.id === deletedId);
  const [removedCol] = newColumns.splice(newColumns.indexOf(deletedCol!), 1);

  return newColumns.map((col, index) => ({
    ...col,
    sortIndex: index,
  })) as Column[];
};

export const reorderColumns = (from: number, to: number, columns: Column[]) => {
  const [reorderedColumn] = columns.splice(from, 1);
  columns.splice(to, 0, reorderedColumn);

  return columns.map((col, index) => ({
    ...col,
    sortIndex: index,
  })) as Column[];
};

export const reorderTasksInSameLane = (
  from: number,
  to: number,
  tasks: Task[],
) => {
  const [movedTask] = tasks.splice(from, 1);
  tasks.splice(to, 0, movedTask);

  return tasks.map((task, index) => ({
    ...task,
    sortIndex: index,
  }));
};
