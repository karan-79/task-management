import { TaskForm } from "@/features/Project/Content/TaskForm/types";
import { UUID } from "@/types/generalTypes";

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
