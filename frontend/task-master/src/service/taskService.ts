import { http } from "@/config/axiosConfig";
import { TaskForm } from "@/features/Project/Content/TaskForm/types";
import { Task } from "@/features/Project/types";
import { getData } from "@/utils";
import { CreateTaskRequest, UpdateTaskSortIndexRequest } from "./types";
import { UUID } from "@/types/generalTypes";

export const createTask = (
  task: TaskForm,
  boardId: number,
  projectId: UUID,
) => {
  return http
    .post<string>(`/v1/tasks`, {
      task,
      boardId,
      projectId,
    } satisfies CreateTaskRequest)
    .then(getData);
};

export const patchSortIndex = (
  updatedTasksWithIndexes: UpdateTaskSortIndexRequest[],
) => {
  return http.patch<void>("/v1/tasks/order", updatedTasksWithIndexes);
};

export const patchStatus = (status: string, taskId: string) => {
  return http.patch<void>(`/v1/tasks/${taskId}/status`, { status });
};

export const getTaskById = (id: UUID) => {
  return http.get<Task>("/v1/tasks/" + id).then(getData);
};

export const updateTask = (task: Task) => {
  return http.put<void>("/v1/tasks", task);
};

export const deleteTask = (id: UUID) => {
  return http.delete<void>("/v1/tasks/" + id);
};
