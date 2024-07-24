import { TaskForm } from "@/features/Project/Content/TaskForm/types";
import { Nullable, UUID } from "@/types/generalTypes";
import { Person, TaskPriority, TaskType } from "@/features/Project/types.ts";

export type CreateAccountRequest = {
  name: string;
  username: string;
  password: string;
  email: string | null;
};

export type LoginRequest = Pick<CreateAccountRequest, "username" | "password">;

export type LoggedIn = {
  loggedIn: boolean;
};

export type ProjectRequest = {
  name: string;
  description?: string;
  shortName: string;
  type?: string;
};

export type CreateBoardRequest = {
  name: string;
  description?: string;
};

export type CreateColumnRequest = {
  name: string;
  sortIndex: number;
};

export type CreateTaskRequest = {
  task: TaskForm;
  projectId: UUID;
  boardId: number;
};

export type UpdateTaskSortIndexRequest = {
  taskId: string;
  sortIndex: number;
};

export type UpdateStatusOfTaskRequest = {
  status: string;
};

export type APIProjectTasks = {
  taskId: string;
  assignee: Nullable<Person>;
  title: string;
  type: TaskType;
  status: string;
  priority: TaskPriority;
};
