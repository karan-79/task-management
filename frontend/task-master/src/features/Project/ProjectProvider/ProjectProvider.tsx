import { UUID } from "@/types/generalTypes.ts";
import { createContext, FC, PropsWithChildren, useContext } from "react";

type ProjectContext = { projectId: UUID };

const Context = createContext<ProjectContext>({ projectId: "" });

type Props = {
  projectId: UUID;
};

const ProjectProvider: FC<PropsWithChildren<Props>> = ({
  projectId,
  children,
}) => {
  return <Context.Provider value={{ projectId }}>{children}</Context.Provider>;
};

export default ProjectProvider;

export const useProject = () => useContext(Context);
