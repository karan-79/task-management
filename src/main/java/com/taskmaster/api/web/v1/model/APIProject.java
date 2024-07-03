package com.taskmaster.api.web.v1.model;

import java.util.UUID;

public record APIProject(
        UUID id,
        String name,
        String type,
        String shortName,
        Integer totalIssues,
        Integer totalBoards
) {
}
