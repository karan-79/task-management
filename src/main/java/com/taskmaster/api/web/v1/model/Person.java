package com.taskmaster.api.web.v1.model;

import java.util.UUID;

public record Person(
        UUID id,
        String name,
        String email,
        String url
) {
}
