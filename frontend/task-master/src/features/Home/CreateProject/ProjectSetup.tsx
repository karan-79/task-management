import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/Sheet";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs";
import ProjectForm from "./ProjectForm.tsx";
import AccessManagement from "./AccessManagement";
import { ProjectRequest } from "@/service/types.ts";
import {
  createProject,
  getProjectById,
  updateProject,
} from "@/service/projectService.ts";
import {
  isProjectSetupSheetOpenForUpdate,
  ProjectSetupSheetState,
} from "@/features/Home/types.ts";
import { Project } from "@/features/Project/types.ts";

const getInitialState = (
  sheetState: ProjectSetupSheetState,
): ProjectRequest => {
  return isProjectSetupSheetOpenForUpdate(sheetState)
    ? {
        name: sheetState.project.name,
        type: sheetState.project.type,
        shortName: sheetState.project.shortName,
        description: sheetState.project.description,
      }
    : {
        name: "",
        type: "",
        shortName: "",
        description: "",
      };
};

type Props = {
  sheetState: ProjectSetupSheetState;
  onClose: () => void;
  onSubmit: (savedProject: Project) => void;
};

const ProjectSetup: FC<Props> = ({ sheetState, onClose, onSubmit }) => {
  const projectForm = useMemo(() => getInitialState(sheetState), []);

  const handleCloseSheet = () => {
    onClose();
  };

  const handleSubmit = (project: ProjectRequest) => {
    return createProject(project).then(onSubmit);
  };

  const handleUpdate = (project: ProjectRequest) => {
    if (isProjectSetupSheetOpenForUpdate(sheetState)) {
      updateProject(sheetState.project.id, project).then(() =>
        onSubmit({ ...sheetState.project, ...project }),
      );
    }
  };

  return (
    <Sheet open={true} onOpenChange={handleCloseSheet}>
      <SheetContent className="min-w-[600px]">
        {isProjectSetupSheetOpenForUpdate(sheetState) ? (
          <UpdateSheetHeader />
        ) : (
          <CreateSheetHeader />
        )}
        {isProjectSetupSheetOpenForUpdate(sheetState) ? (
          <Tabs defaultValue="details" className="m-2">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="access">Access</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <ProjectForm
                key={projectForm.name}
                onSubmit={handleUpdate}
                initialValues={projectForm}
                isOpenForUpdate={true}
              />
            </TabsContent>

            <TabsContent value="access">
              <AccessManagement projectId={sheetState.project.id} />
            </TabsContent>
          </Tabs>
        ) : (
          <ProjectForm onSubmit={handleSubmit} initialValues={projectForm} />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ProjectSetup;

function UpdateSheetHeader() {
  return (
    <SheetHeader>
      <SheetTitle>Edit project</SheetTitle>
      <SheetDescription>Make changes to your project</SheetDescription>
    </SheetHeader>
  );
}

function CreateSheetHeader() {
  return (
    <SheetHeader>
      <SheetTitle>Create new project</SheetTitle>
      <SheetDescription>Create a new project for your work</SheetDescription>
    </SheetHeader>
  );
}
