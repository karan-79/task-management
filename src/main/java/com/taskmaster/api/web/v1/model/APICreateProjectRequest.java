package com.taskmaster.api.web.v1.model;

import jakarta.validation.constraints.NotEmpty;

public record APICreateProjectRequest(@NotEmpty String name,
                                      String description,
                                      @NotEmpty String shortName,
                                      String type) {}
