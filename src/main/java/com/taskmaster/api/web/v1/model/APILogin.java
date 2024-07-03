package com.taskmaster.api.web.v1.model;

import jakarta.validation.constraints.NotEmpty;

public record APILogin(@NotEmpty String username,@NotEmpty String password) {
}
