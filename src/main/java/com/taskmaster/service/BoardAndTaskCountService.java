package com.taskmaster.service;

import com.taskmaster.domain.BoardsDAO;
import com.taskmaster.domain.TasksDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardAndTaskCountService {
    private final BoardsDAO boardsDAO;
    private final TasksDAO tasksDAO;

    public Map<UUID, Integer> getTotalBoardsInProject(Set<UUID> projectIds) {
        var p = boardsDAO.selectCountOfBoards(projectIds);
        return p.stream()
                .flatMap(map -> map.entrySet().stream())
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue
                ));

    }


    public Map<UUID, Integer> getTasksCountForProjects(Set<UUID> projectIds) {
        var counts = tasksDAO.selectCountOfTasks(projectIds);
        return counts.stream()
                .flatMap(map -> map.entrySet().stream())
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue
                ));
    }
}
