import { UUID } from "@/types/generalTypes.ts";
import { Project } from "../Project/types";

type Open = { __tag: "OPEN" };
type Closed = { __tag: "CLOSED" };

type OpenForCreate = Open & {
  type: "Create";
};

type OpenForUpdate = Open & {
  type: "Update";
  project: Project;
};

export type ProjectSetupSheetState = OpenForCreate | OpenForUpdate | Closed;

export const isProjectSetupSheetOpenForCreate = (
  state: ProjectSetupSheetState
): state is OpenForCreate => state.__tag === "OPEN" && state.type === "Create";

export const isProjectSetupSheetOpenForUpdate = (
  state: ProjectSetupSheetState
): state is OpenForUpdate => state.__tag === "OPEN" && state.type === "Update";

export const isProjectSetupOpen = (
  state: ProjectSetupSheetState
): state is OpenForUpdate | OpenForCreate => state.__tag === "OPEN";
