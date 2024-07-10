package com.taskmaster.api.web.v1.model;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record APICreateColumnRequest (@NotEmpty String name, Integer sortIndex){
}
