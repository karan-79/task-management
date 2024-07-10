import { projectsOverview } from "@/service/data.ts";
import { Project } from "@/features/Project/types.ts";
import { http } from "@/config/axiosConfig.ts";
import { getData } from "@/utils.ts";
import { ProjectRequest } from "@/service/types.ts";
import { UUID } from "@/types/generalTypes";

export const getProjectById = (projectId: UUID) => {
  return http.get<Project>("/v1/projects/" + projectId).then(getData);
};

export const getAllProjects = () => {
  return http.get<Project[]>("/v1/projects").then((data) => getData(data));
};

export const createProject = (project: ProjectRequest) => {
  return http.post<Project>("/v1/projects", project).then(getData);
};

export const updateProject = (projectId: UUID, project: ProjectRequest) => {
  return http.patch<void>("/v1/projects/" + projectId, project);
};

export const getProjectMembers = (projectId: UUID) => {};
