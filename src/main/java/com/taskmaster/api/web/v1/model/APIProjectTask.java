package com.taskmaster.api.web.v1.model;

import com.taskmaster.domain.model.TaskPriority;
import com.taskmaster.domain.model.TaskType;

public record APIProjectTask(
        String taskId,
        Person assignee,
        String title,
        TaskType type,
        String status,
        TaskPriority priority
) {
}
