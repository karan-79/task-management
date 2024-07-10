package com.taskmaster.domain.model;

public record BoardColumn(
        int id,
        String name,
        int sortIndex
) {
}
