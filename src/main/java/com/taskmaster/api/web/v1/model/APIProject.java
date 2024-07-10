package com.taskmaster.api.web.v1.model;

import com.taskmaster.domain.model.Project;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class APIProject {

        UUID id;
        String name;
        String type;
        String shortName;
        Integer totalIssues; //tODO rename to totalTasks
        Integer totalBoards;
}
