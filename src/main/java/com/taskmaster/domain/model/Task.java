package com.taskmaster.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Setter
@Getter
@AllArgsConstructor
public class Task {
        String id;
        String title;
        UUID assignee;
        String description;
        String status; //this is column name but should have the column id
        TaskType taskType;
        TaskPriority priority; // this is priority name gonna hard code
        Double storyPoints;
        Integer estimateDays;
        Integer estimateMinutes;
        Integer boardId;
        UUID projectId;
        String parentId;
        UUID createdBy;
        LocalDateTime createdAt;
}
