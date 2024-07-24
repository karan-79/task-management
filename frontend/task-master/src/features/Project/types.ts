import { Nullable, UUID } from "@/types/generalTypes.ts";

export type Project = {
  id: string;
  name: string;
  description: string;
  shortName: string;
  type: string;
  totalIssues?: number;
  totalBoards?: number;
  // TODO can maybe add links
};

export type PanelSections = "Board" | "Issues";

export type Column = {
  id: number;
  name: string;
  sortIndex: number;
};

export type Person = {
  id: UUID;
  name: string;
  email?: string;
  imageUrl?: string;
};

export type TaskType = "TASK" | "BUG" | "FEATURE" | "";
export type TaskPriority = "HIGH" | "LOW" | "URGENT" | "";

//Task shown in board
export type Task = {
  id: string;
  title: string;
  assignee: Nullable<Person>;
  description: string;
  status: string; // which column it belongs to
  taskType: TaskType;
  priority: TaskPriority;
  storyPoints?: string;
  sortIndex: number;
  estimateDays?: number;
  estimateMinutes?: number;
};

export type Board = {
  id: number;
  name: string;
  description: string;
  projectId: UUID;
  columns: Column[];
  tasks: Task[];
};

export type BoardIdentity = Pick<Board, "id" | "name">;
