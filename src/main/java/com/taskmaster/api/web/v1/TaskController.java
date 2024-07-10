package com.taskmaster.api.web.v1;

import com.taskmaster.api.web.v1.model.APITask;
import com.taskmaster.api.web.v1.model.APIUpdateTaskSortIndexRequest;
import com.taskmaster.api.web.v1.model.CreateTaskRequest;
import com.taskmaster.config.AuthPrincipal;
import com.taskmaster.service.TaskService;
import jakarta.validation.constraints.NotEmpty;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/v1/tasks")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;

    @PostMapping
    public String createTask(@AuthenticationPrincipal AuthPrincipal principal, @RequestBody CreateTaskRequest taskRequest) {
        return taskService.createTaskFromBoard(taskRequest, principal.getUserId());
    }

    @PatchMapping("/order")
    public void patchOrder(@RequestBody List<APIUpdateTaskSortIndexRequest> taskWithNewIndex) {
        taskService.updateSortIndexOfTasksOnBoardColumn(taskWithNewIndex);
    }

    @PatchMapping("/{taskId}/status")
    public void patchStatus(@PathVariable String taskId, @RequestBody Map<String, String> newStatus) {
        taskService.updateStatusOfTask(taskId, newStatus.get("status"));
    }

    @GetMapping("/{id}")
    public APITask getTaskById(@PathVariable String id) {
        return taskService.getTaskById(id);
    }

    @PutMapping
    public void updateTask(@RequestBody APITask task) {
        taskService.updateTask(task);
    }

    @DeleteMapping("/{taskId}")
    public void deleteTask(@PathVariable @NotEmpty String taskId) {
        taskService.deleteTask(taskId);
    }
}
