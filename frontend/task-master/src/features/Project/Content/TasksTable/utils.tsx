import { Person, TaskPriority, TaskType } from "@/features/Project/types.ts";
import { isEqual } from "lodash";
import {
  BookOpenText,
  Bug,
  ChevronsDown,
  ShieldAlert,
  SquareCheck,
} from "lucide-react";
import { cn } from "@/utils.ts";

export const getInitials = (p: Person) => {
  const f = p.name.split(" ")[0][0];
  const l = p.name.split(" ")[1];
  return l ? f + l[0] : f;
};

export const getIconForType = (taskType: TaskType) => {
  const sizeProps = { className: "h-4 w-4" };
  if (isEqual(taskType, "TASK")) return <SquareCheck {...sizeProps} />;
  if (isEqual(taskType, "BUG")) return <Bug {...sizeProps} />;
  return <BookOpenText {...sizeProps} />;
};

export const getIconForPriority = (priority: TaskPriority) => {
  const sizeProps = { className: "h-4 w-4" };
  if (isEqual(priority, "URGENT")) return <ShieldAlert {...sizeProps} />;
  if (isEqual(priority, "LOW")) return <ChevronsDown {...sizeProps} />;
  return <ChevronsDown className={cn("rotate-180", sizeProps.className)} />;
};
