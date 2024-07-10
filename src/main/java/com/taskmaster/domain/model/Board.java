package com.taskmaster.domain.model;

import java.util.List;
import java.util.UUID;

public record Board(Integer id,
                    String name,
                    String description,
                    UUID projectId,
                    List<BoardColumn> columns) {
}
