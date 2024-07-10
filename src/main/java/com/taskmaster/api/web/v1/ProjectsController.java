package com.taskmaster.api.web.v1;

import com.taskmaster.api.web.v1.model.APICreateProjectRequest;
import com.taskmaster.api.web.v1.model.APIProject;
import com.taskmaster.api.web.v1.model.Person;
import com.taskmaster.config.AuthPrincipal;
import com.taskmaster.service.ProjectsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

//TODO replace voids with ResponseEntities
@RestController
@RequestMapping("/v1/projects")
@RequiredArgsConstructor
public class ProjectsController {


    private final ProjectsService projectsService;

    @PostMapping
    public APIProject postProject(@RequestBody @Valid APICreateProjectRequest createProjectRequest, @AuthenticationPrincipal AuthPrincipal principal) {
        return projectsService.createProject(createProjectRequest, principal.getUserId());
    }

    @GetMapping
    public List<APIProject> getAllProjects(@AuthenticationPrincipal AuthPrincipal principal) {
        return projectsService.getAllProjects(principal.getUserId());
    }

    @GetMapping("/{projectId}")
    public APIProject getProjectById(@PathVariable UUID projectId, @AuthenticationPrincipal AuthPrincipal principal) {
        return projectsService.getProjectById(projectId);
    }

    @PatchMapping("/{projectId}")
    public ResponseEntity<Void> update(@PathVariable UUID projectId, @RequestBody APICreateProjectRequest updateProjectRequest) {
        projectsService.updateProjectDetails(projectId, updateProjectRequest);
        return ResponseEntity.ok().build();

    }
}
