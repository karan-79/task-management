package com.taskmaster.domain.model;

import java.time.LocalDate;
import java.util.UUID;

public record User(
        Long id,
        UUID guid,
        String username,
        String password,
        String name,
        String email,
        Role role,
        LocalDate createdAt
) {
}
