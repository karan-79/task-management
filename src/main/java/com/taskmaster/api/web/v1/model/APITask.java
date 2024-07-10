package com.taskmaster.api.web.v1.model;

import com.taskmaster.domain.model.TaskPriority;
import com.taskmaster.domain.model.TaskType;

public record APITask(
        String id,
        String title,
        Person assignee,
        String status,
        TaskType taskType,
        String description,
        TaskPriority priority,
        int sortIndex,
        Double storyPoints,
        Integer estimateDays,
        Integer estimateMinutes
) {
}
