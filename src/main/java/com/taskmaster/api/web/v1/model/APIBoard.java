package com.taskmaster.api.web.v1.model;

import com.taskmaster.domain.model.BoardColumn;

import java.util.List;
import java.util.UUID;

public record APIBoard(
    Integer id,
    String name,
    String description,
    UUID projectId,
    List<BoardColumn> columns,
    List<APITask> tasks
) {
}
