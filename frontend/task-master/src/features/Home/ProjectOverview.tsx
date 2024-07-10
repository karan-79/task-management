import ProjectCard from "@/features/Home/ProjectCard.tsx";
import { useNavigate } from "react-router-dom";
import ProjectSetup from "@/features/Home/CreateProject";
import { useEffect, useState } from "react";
import { useFetchWithLoading } from "@/hooks/useFetchWithLoading.ts";
import { getAllProjects } from "@/service/projectService.ts";
import { Project } from "@/features/Project/types.ts";
import { Separator } from "@/components/Seperator";
import { useProjects } from "@/store/userStore.ts";
import { isEmpty } from "lodash";
import EmptyProject from "@/features/Home/EmptyProject.tsx";
import ProjectLoadingSkeleton from "@/features/Home/ProjectLoadingSkeleton.tsx";
import ProjectHeader from "@/features/Home/ProjectHeader.tsx";
import {
  isProjectSetupOpen,
  isProjectSetupSheetOpenForCreate,
  ProjectSetupSheetState,
} from "@/features/Home/types.ts";

const ProjectOverview = () => {
  const navigate = useNavigate();

  const [sheetState, setSheetState] = useState<ProjectSetupSheetState>({
    __tag: "CLOSED",
  });

  const { projects, addProject, setProjects } = useProjects((state) => state);

  const { isLoading, data } = useFetchWithLoading<Project[]>({
    fetchFn: getAllProjects,
    initialState: [],
  });

  //TODO really don't need to put in global state
  useEffect(() => {
    if (isLoading) return;
    if (!isLoading && data) {
      setProjects(data);
    }
  }, [data]);

  const handleCardClick = (id: string) => () => {
    navigate("/home/projects/" + id);
  };

  const handleSubmitProject = (newProj: Project) => {
    if (isProjectSetupSheetOpenForCreate(sheetState)) {
      addProject(newProj);
    } else {
      setProjects([...projects.filter((p) => p.id !== newProj.id), newProj]);
    }

    setSheetState({ __tag: "CLOSED" });
  };

  return (
    <>
      <div className="p-16 flex flex-col gap-6">
        <ProjectHeader
          onCreateProject={() =>
            setSheetState({ __tag: "OPEN", type: "Create" })
          }
        />
        <Separator />

        {isEmpty(projects) && <EmptyProject />}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isLoading && <ProjectLoadingSkeleton />}
          {!isEmpty(projects) &&
            projects.map((p) => (
              <ProjectCard
                onClick={handleCardClick(p.id)}
                project={p}
                key={p.id}
                onEdit={() =>
                  setSheetState({ __tag: "OPEN", type: "Update", project: p })
                }
              />
            ))}
        </div>
      </div>
      {isProjectSetupOpen(sheetState) && (
        <ProjectSetup
          sheetState={sheetState}
          onClose={() => {
            setSheetState({ __tag: "CLOSED" });
          }}
          onSubmit={handleSubmitProject}
        />
      )}
    </>
  );
};

export default ProjectOverview;
