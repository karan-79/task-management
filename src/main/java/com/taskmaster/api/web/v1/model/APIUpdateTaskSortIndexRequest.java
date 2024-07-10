package com.taskmaster.api.web.v1.model;

public record APIUpdateTaskSortIndexRequest(
        String taskId,
        int sortIndex
) {
}
