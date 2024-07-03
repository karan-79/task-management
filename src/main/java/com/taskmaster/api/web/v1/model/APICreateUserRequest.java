package com.taskmaster.api.web.v1.model;

import jakarta.validation.constraints.NotEmpty;

public record APICreateUserRequest (
        @NotEmpty String username,
        @NotEmpty String password,
        @NotEmpty String name,
        String email
) {}
