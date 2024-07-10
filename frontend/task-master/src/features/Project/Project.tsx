import { useParams } from "react-router-dom";
import SidePanel from "@/features/Project/SidePanel";
import Content from "@/features/Project/Content";
import { useEffect, useState } from "react";
import { getProjectById } from "@/service/projectService.ts";
import { Project } from "@/features/Project/types.ts";
import { PanelSections } from "@/features/Project/types.ts";
import { UUID } from "@/types/generalTypes.ts";

const Project = () => {
  const { projectId } = useParams<{ projectId: UUID }>();
  const [selected, setSelected] = useState<PanelSections>("Board");
  const [project, setProject] = useState<Project>();

  useEffect(() => {
    if (!projectId) return;
    getProjectById(projectId).then(setProject);
  }, []);

  if (!projectId) return <>NOT FOUND</>;
  if (!project) return <>Loading..</>;

  return (
    <div className="grid grid-cols-12 gap-4 h-full">
      <SidePanel
        selectedView={selected}
        onChangeSelectedView={(selected: PanelSections) =>
          setSelected(selected)
        }
        projectName={project?.name || ""}
      />
      <Content view={selected} projectId={project.id} />
    </div>
  );
};

export default Project;
