package com.taskmaster.service;

import com.taskmaster.api.web.v1.model.APITask;
import com.taskmaster.api.web.v1.model.APIUpdateTaskSortIndexRequest;
import com.taskmaster.api.web.v1.model.CreateTaskRequest;
import com.taskmaster.api.web.v1.model.Person;
import com.taskmaster.domain.TasksDAO;
import com.taskmaster.domain.model.Task;
import com.taskmaster.utils.DbUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TasksDAO tasksDAO;
    private final ProjectsService projectsService;
    private final UsersService usersService;

    public List<APITask> getTasksForBoard(int boardId, UUID projectId) {
        var tasks = tasksDAO.getTasksForBoard(boardId, projectId);

        if (tasks.isEmpty()) return List.of();

        var userIds = tasks.stream().map(Task::getAssignee).collect(Collectors.toSet());

        var persons = usersService.getPersons(userIds).stream().collect(Collectors.toMap(Person::id, Function.identity()));

        var boardTasks = tasksDAO.getTaskSortIndexOnTable(
                tasks.stream().map(Task::getId).toList(),
                boardId);

        return tasks.stream().map(task -> {
            return new APITask(
                    task.getId(),
                    task.getTitle(),
                    persons.get(task.getAssignee()),
                    task.getStatus(),
                    task.getTaskType(),
                    null,
                    task.getPriority(),
                    boardTasks.get(task.getId()),
                    task.getStoryPoints(),
                    task.getEstimateDays(),
                    task.getEstimateMinutes()
            );
        }).toList();
    }

    @Transactional
    public String createTaskFromBoard(CreateTaskRequest taskRequest, UUID userId) {

        var task = taskRequest.task();
        var projectId = taskRequest.projectId();

        // get the prefix from shortName of project
        var shortName = projectsService.getShortName(projectId);
        // get the latest id to be used
        var isNewTaskInProject = tasksDAO.queryIdTrack(shortName);
        int maxId;
        if (isNewTaskInProject) {
            tasksDAO.insertTrackIdForFirstTaskInProject(shortName, 1);
            maxId = 1;
        } else {
            maxId = tasksDAO.getMaxIdUsedForPrefix(shortName) + 1;
            tasksDAO.incrementMaxForPrefix(shortName, maxId);
        }

        //insertTask
        var newTask = new Task(
                shortName + "-" + maxId,
                task.title(),
                task.assignee().id(),
                task.description(),
                task.status(),
                task.taskType(),
                task.priority(),
                task.storyPoints(),
                task.estimateDays(),
                task.estimateMinutes(),
                taskRequest.boardId(),
                projectId,
                null,
                userId,
                null
        );

        tasksDAO.insertTask(newTask);
        tasksDAO.insertIntoBoardTask(newTask.getId(), taskRequest.boardId(), Integer.MAX_VALUE);

        return newTask.getId();
    }

    public void updateSortIndexOfTasksOnBoardColumn(List<APIUpdateTaskSortIndexRequest> updateTaskSortIndexRequests) {
        tasksDAO.updateSortIndexInColumn(updateTaskSortIndexRequests);
    }

    //TODO add unique contraint to the taskId
    public void updateStatusOfTask(String taskId, String newStatus) {
        tasksDAO.updateStatus(taskId, newStatus);
    }

    public APITask getTaskById(String id) {

        var task = tasksDAO.selectTaskById(id);
        if (task == null) return null;
        var persons = usersService.getPersons(Set.of(task.getAssignee())).stream().toList();

        Person p = null;
        if (!persons.isEmpty()) {
            p = persons.get(0);
        }

        var a = tasksDAO.getTaskSortIndexOnTable(List.of(task.getId()), task.getBoardId());

        return new APITask(
                task.getId(),
                task.getTitle(),
                p,
                task.getStatus(),
                task.getTaskType(),
                task.getDescription(),
                task.getPriority(),
                a.get(task.getId()) == null ? Integer.MAX_VALUE : a.get(task.getId()),
                task.getStoryPoints(),
                task.getEstimateDays(),
                null
        );

    }


    public void updateTask(APITask updatedTask) {
        //get old task
        var oldTask = tasksDAO.selectTaskById(updatedTask.id());

        DbUtils.updateIfChanged(updatedTask::title, oldTask::getTitle, oldTask::setTitle);
        DbUtils.updateIfChanged(updatedTask::description, oldTask::getDescription, oldTask::setDescription);
        DbUtils.updateIfChanged(updatedTask::status, oldTask::getStatus, oldTask::setStatus);
        DbUtils.updateIfChanged(() -> updatedTask.assignee().id(), oldTask::getAssignee, oldTask::setAssignee);
        DbUtils.updateIfChanged(updatedTask::priority, oldTask::getPriority, oldTask::setPriority);
        DbUtils.updateIfChanged(updatedTask::storyPoints, oldTask::getStoryPoints, oldTask::setStoryPoints);
        DbUtils.updateIfChanged(updatedTask::estimateDays, oldTask::getEstimateDays, oldTask::setEstimateDays);
        DbUtils.updateIfChanged(updatedTask::taskType, oldTask::getTaskType, oldTask::setTaskType);

        tasksDAO.updateTask(oldTask);
    }

    @Transactional
    public void deleteTask(String taskId) {
        tasksDAO.deleteTaskFromBoardTask(taskId);
        tasksDAO.deleteTask(taskId);
    }

}
