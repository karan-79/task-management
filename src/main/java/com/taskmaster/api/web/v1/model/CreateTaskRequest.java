package com.taskmaster.api.web.v1.model;

import java.util.UUID;

public record CreateTaskRequest (APITask task, Integer boardId, UUID projectId) {
}
