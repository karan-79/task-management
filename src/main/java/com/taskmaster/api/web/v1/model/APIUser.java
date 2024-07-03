package com.taskmaster.api.web.v1.model;

import com.taskmaster.domain.model.Role;

import java.util.UUID;

public record APIUser(
        UUID id,
        String name,
        String username,
        Role role
) {
}
