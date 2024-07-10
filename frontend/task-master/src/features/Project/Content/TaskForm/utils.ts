import { TaskForm } from "@/features/Project/Content/TaskForm/types.ts";
import { TaskType } from "../../types";

export type TaskFormErrors = {
  field: keyof TaskForm;
  message: string;
};

export function validateTaskForm(task: TaskForm): TaskFormErrors[] {
  const errors: TaskFormErrors[] = [];

  // Validate title
  if (!task.title.trim()) {
    errors.push({ field: "title", message: "Title is required" });
  }

  // Validate assignee
  if (!task.assignee) {
    errors.push({ field: "assignee", message: "Assignee is required" });
  }

  // Validate description
  if (!task.description.trim()) {
    errors.push({ field: "description", message: "Description is required" });
  }

  // Validate type
  if (!task.taskType) {
    errors.push({ field: "taskType", message: "Type is required" });
  }

  // Validate priority
  if (!task.priority) {
    errors.push({ field: "priority", message: "Priority is required" });
  }

  // Validate storyPoints if type is "FEATURE"
  if (task.taskType === "FEATURE") {
    if (!task.storyPoints) {
      errors.push({
        field: "storyPoints",
        message: "Story Points are required for features",
      });
    } else if (isNaN(Number(task.storyPoints))) {
      errors.push({
        field: "storyPoints",
        message: "Story Points must be a number",
      });
    }
  }

  // Validate estimateDays
  if (!task.estimateDays || task.estimateDays < 0) {
    errors.push({
      field: "estimateDays",
      message: "Estimate Days must be a non-negative number",
    });
  }

  return errors;
}

export const groupErrorsByKeys = (errors: TaskFormErrors[]) => {
  return errors.reduce((a, c) => {
    if (a[c.field]) {
      (a[c.field] as TaskFormErrors[]).push(c);
      return a;
    }
    a[c.field] = [c];
    return a;
  }, {} as Record<keyof TaskForm, TaskFormErrors[]>);
};

export const initialState = (status: string): TaskForm => ({
  title: "",
  priority: "",
  description: "",
  taskType: "",
  status,
  assignee: null,
  storyPoints: "",
  estimateDays: undefined,
  estimateMinutes: undefined,
  sortIndex: 0,
});
