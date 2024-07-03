package com.taskmaster.domain.model;

import java.util.UUID;

public record Account(
        UUID guid,
        String username,
        String password
) {
}
