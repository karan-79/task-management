package com.taskmaster.domain.model;

import java.util.UUID;

public record RecentBoardJoin(
        Integer id,
        String name,
        UUID projectId,
        String description,
        int columnId,
        String columnName,
        int sortIndex
) {
}
