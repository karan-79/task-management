package com.taskmaster.api.web.v1;

import com.taskmaster.api.web.v1.model.APIProjectTask;
import com.taskmaster.service.ProjectTasksService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/v1/projects/{projectId}/tasks")
@RequiredArgsConstructor
public class ProjectTasksController {

    private final ProjectTasksService projectTasksService;

    @GetMapping
    public ResponseEntity<List<APIProjectTask>> getAllTasksForProject(@PathVariable UUID projectId) {
        return ResponseEntity.ok(projectTasksService.getAllTasksInProject(projectId));
    }

}
