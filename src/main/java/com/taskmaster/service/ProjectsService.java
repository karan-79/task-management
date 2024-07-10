package com.taskmaster.service;

import com.taskmaster.api.web.v1.model.APICreateProjectRequest;
import com.taskmaster.api.web.v1.model.APIProject;
import com.taskmaster.api.web.v1.model.Person;
import com.taskmaster.domain.ProjectsDAO;
import com.taskmaster.domain.model.Project;
import com.taskmaster.utils.DbUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectsService {
    private final ProjectsDAO projectsDAO;
    private final BoardAndTaskCountService boardAndTaskCountService;
    private final UsersService usersService;

    private Function<Project, APIProject> mapToApiProject() {
        return (project) -> new APIProject(
                project.getGuid(),
                project.getName(),
                project.getType(),
                project.getShortName(),
                0,
                0
        );
    }

    public APIProject createProject(APICreateProjectRequest request, UUID userId) {
        //can check for rights when authorisation is in place

        var project = new Project(
                null,
                UUID.randomUUID(),
                request.name(),
                request.description(),
                request.shortName(),
                request.type(),
                userId,
                null
        );

        var projectId = projectsDAO.saveProject(project);

        return new APIProject(projectId,
                request.name(),
                request.type(),
                request.shortName(),
                0,
                0);
    }

    public List<APIProject> getAllProjects(UUID userId) {
        var projects = projectsDAO.getAllProjectsForUser(userId);

        if (projects.isEmpty()) return Collections.emptyList();

        var projectIds = projects.stream().map(Project::getGuid).collect(Collectors.toSet());
        var boardsCountPerProject = boardAndTaskCountService.getTotalBoardsInProject(projectIds);
        var tasksCountPerProject = boardAndTaskCountService.getTasksCountForProjects(projectIds);

        return projects.stream().map(project -> new APIProject(
                project.getGuid(),
                project.getName(),
                project.getType(),
                project.getShortName(),
                Optional.ofNullable(tasksCountPerProject.get(project.getGuid())).orElse(0),
                Optional.ofNullable(boardsCountPerProject.get(project.getGuid())).orElse(0)
        )).toList();
    }

    public APIProject getProjectById(UUID projectId) {
        var project = projectsDAO.getById(projectId);

        if (project == null)
            throw new RuntimeException("Project does not exist");

        return mapToApiProject().apply(project);
    }

    public String getShortName(UUID projectId) {
        return projectsDAO.getShortName(projectId);
    }

    public void updateProjectDetails(UUID projectId, APICreateProjectRequest request) {
        var existingProject = projectsDAO.getById(projectId);

        DbUtils.updateIfChanged(request::name, existingProject::getName, existingProject::setName);
        DbUtils.updateIfChanged(request::description, existingProject::getDescription, existingProject::setDescription);
        DbUtils.updateIfChanged(request::type, existingProject::getType, existingProject::setType);

        projectsDAO.updateProjectDetails(existingProject);

    }

}
