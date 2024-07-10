package com.taskmaster.api.web.v1.model;

import jakarta.validation.constraints.NotEmpty;

public record APICreateBoardRequest(@NotEmpty String name, String description) {
}
