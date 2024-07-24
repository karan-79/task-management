import { UUID } from "@/types/generalTypes";
import { TaskType } from "../../types";

type Open = {
  __tag: "OPEN";
  state: "CREATE";
  status: string;
};

type OpenForUpdate = {
  __tag: "OPEN";
  state: "UPDATE";
  id: UUID;
};

type Close = {
  __tag: "CLOSE";
};

export type TaskSheetState = Open | OpenForUpdate | Close;

export const isTaskSheetOpenForCreate = (
  state: TaskSheetState,
): state is Open => state.__tag === "OPEN" && state.state === "CREATE";

export const isTaskSheetOpenForView = (
  state: TaskSheetState,
): state is OpenForUpdate => state.__tag === "OPEN" && state.state === "UPDATE";
