import {projectsOverview} from "@/service/data.ts";
import {Project} from "@/features/Project/types.ts";

export const getProjectById = (id: string) => {
    return new Promise<Project>(res=> {
        setTimeout(()=>{
            res(projectsOverview.find(p=>p.id == id))
        }, 3000)
    })
}