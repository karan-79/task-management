import { projectsOverview } from "@/service/data.ts";
import { Person, Project } from "@/features/Project/types.ts";
import { http } from "@/config/axiosConfig.ts";
import { getData } from "@/utils.ts";
import { APIProjectTasks, ProjectRequest } from "@/service/types.ts";
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

export const getProjectMembers = (projectId: UUID) => {
  return http.get<Person[]>(`/v1/projects/${projectId}/members`).then(getData);
};

export const addProjectMember = (userId: UUID, projectId: UUID) => {
  return http.post<void>(`/v1/projects/${projectId}/members`, { id: userId });
};

export const getTasksForProject = (projectId: UUID) => {
  return http
    .get<APIProjectTasks[]>(`/v1/projects/${projectId}/tasks`)
    .then(getData);
};
