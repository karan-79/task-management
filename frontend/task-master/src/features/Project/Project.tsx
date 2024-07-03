import {useParams} from "react-router-dom";
import SidePanel from "@/features/Project/SidePanel";
import Content from "@/features/Project/Content";
import {useEffect, useState} from "react";
import {getProjectById} from "@/service/projectService.ts";
import {Project} from "@/features/Project/types.ts";
import {PanelSections} from "@/features/Project/types.ts";

const Project = () => {
    const {projectId} = useParams<{ projectId: string }>();
    const [selected, setSelected] = useState<PanelSections>("Board")
    const [project, setProject] = useState<Project>()

    useEffect(() => {
        if (!projectId) return
        getProjectById(projectId).then(setProject)
    }, []);

    if (!projectId) return <>NOT FOUND</>


    return <div className="flex">
        <SidePanel selectedView={selected}
                   onChangeSelectedView={(selected: PanelSections) => setSelected(selected)}
                   projectId={projectId}/>
        <Content view={selected}/>
    </div>
}

export default Project