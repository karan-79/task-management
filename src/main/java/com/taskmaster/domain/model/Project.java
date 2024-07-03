package com.taskmaster.domain.model;

import org.springframework.data.relational.core.sql.In;

import java.time.LocalDate;
import java.util.UUID;

public record Project(
        Integer id,
        UUID guid,
        String name,
        String description,
        String shortName,
        String type,
        UUID ownerId,
        LocalDate createdAt
) {
}
