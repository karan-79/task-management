package com.taskmaster.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.relational.core.sql.In;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class Project {
        Integer id;
        UUID guid;
        String name;
        String description;
        String shortName;
        String type;
        UUID ownerId;
        LocalDate createdAt;
}
