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

export type CreateTaskSheetState = Open | OpenForUpdate | Close;

export const isTaskSheetOpen = (state: CreateTaskSheetState): state is Open =>
  state.__tag === "OPEN";

export const isTaskSheetOpenForUpdate = (
  state: CreateTaskSheetState
): state is OpenForUpdate => state.__tag === "OPEN" && state.state === "UPDATE";
