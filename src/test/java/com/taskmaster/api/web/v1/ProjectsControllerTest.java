package com.taskmaster.api.web.v1;

import com.taskmaster.BaseIntegrationTest;
import com.taskmaster.api.web.v1.model.APICreateProjectRequest;
import com.taskmaster.api.web.v1.model.APIProject;
import com.taskmaster.service.ProjectsService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;


class ProjectsControllerTest extends BaseIntegrationTest {

    @Autowired
    ProjectsService projectsService;

    @Test
    void post_project() {
        var result = callPost("/v1/projects", new APICreateProjectRequest("proj-1", null, "PP", null), APIProject.class);

        assertTrue(result.getStatusCode().is2xxSuccessful());
        assertNotNull(result.getBody());
        assertNotNull(result.getBody().id());
    }

    @Test
    void getAllProjects() {
        setupDummyProjects();

        var result = callGet("/v1/projects",null, APIProject[].class);
        assertTrue(result.getStatusCode().is2xxSuccessful());
        assertNotNull(result.getBody());
    }

    private void setupDummyProjects() {
        var p1 = new APICreateProjectRequest(
                "proj-2",
                "Some description",
                "TTM",
                "dont know"
        );
        var p2 = new APICreateProjectRequest(
                "proj-3",
                "Some description 2",
                "TOP",
                "dont know"
        );

        projectsService.createProject(p1, UUID.fromString(userId));
        projectsService.createProject(p2, UUID.fromString(userId));
    }

}