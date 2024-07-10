import { Task } from "@/features/Project/types.ts";

export type TaskFormErrors = {
  field: keyof TaskForm;
  message: string;
};

export type TaskForm = Omit<Task, "id">;
