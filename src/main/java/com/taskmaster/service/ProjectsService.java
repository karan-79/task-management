package com.taskmaster.service;

import com.taskmaster.api.web.v1.model.APICreateProjectRequest;
import com.taskmaster.api.web.v1.model.APIProject;
import com.taskmaster.domain.ProjectsDAO;
import com.taskmaster.domain.model.Project;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProjectsService {
    private final ProjectsDAO projectsDAO;

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
        // get all the issues and boards
        return List.of();
    }
}
