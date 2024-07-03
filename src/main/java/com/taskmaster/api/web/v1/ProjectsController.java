package com.taskmaster.api.web.v1;

import com.taskmaster.api.web.v1.model.APICreateProjectRequest;
import com.taskmaster.api.web.v1.model.APIProject;
import com.taskmaster.config.AuthPrincipal;
import com.taskmaster.service.ProjectsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/projects")
@RequiredArgsConstructor
public class ProjectsController {


    private final ProjectsService projectsService;

    @PostMapping
    public APIProject postProject(@RequestBody APICreateProjectRequest createProjectRequest, @AuthenticationPrincipal AuthPrincipal principal) {
        return projectsService.createProject(createProjectRequest, principal.getUserId());
    }

    @GetMapping
    public List<APIProject> getAllProjects(@AuthenticationPrincipal AuthPrincipal principal) {
        return projectsService.getAllProjects(principal.getUserId());
    }


}
