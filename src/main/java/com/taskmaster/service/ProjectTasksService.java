package com.taskmaster.service;

import com.taskmaster.api.web.v1.model.APIProjectTask;
import com.taskmaster.api.web.v1.model.Person;
import com.taskmaster.domain.TasksDAO;
import com.taskmaster.domain.model.Task;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectTasksService {
    private final TasksDAO tasksDAO;
    private final UsersService usersService;

    public List<APIProjectTask> getAllTasksInProject(UUID projectId) {
        var tasks = tasksDAO.getTasksInProject(projectId);
        var persons = usersService.getPersons(tasks.
                stream().map(Task::getAssignee).collect(Collectors.toSet())
        ).stream().filter(Objects::nonNull).collect(Collectors.toMap(Person::id, Function.identity()));

        return tasks.stream().map(task -> new APIProjectTask(
                task.getId(),
                persons.getOrDefault(task.getAssignee(), null),
                task.getTitle(),
                task.getTaskType(),
                task.getStatus(),
                task.getPriority()
        )).toList();
    }
}
