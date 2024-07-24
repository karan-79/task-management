package com.taskmaster.domain;

import com.taskmaster.api.web.v1.model.APIUpdateTaskSortIndexRequest;
import com.taskmaster.domain.model.Task;
import com.taskmaster.domain.model.TaskPriority;
import com.taskmaster.domain.model.TaskType;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class TasksDAO {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    public void insertTask(Task task) {
        var sql = """
                INSERT INTO TASKS 
                    (ID,
                    TITLE,
                    DESCRIPTION,
                    ASSIGNEE,
                    STATUS,
                    TASK_TYPE_ID,
                    PRIORITY,
                    STORY_POINTS,
                    ESTIMATE_DAYS,
                    ESTIMATE_MINUTES,
                    BOARD_ID,
                    GLOBAL_SORT_INDEX,
                    PARENT_ID,
                    PROJECT_ID,
                    CREATED_BY)
                VALUES 
                    (:id,
                    :title,
                    :description,
                    :assignee,
                    :status,
                    :taskTypeId,
                    :priority,
                    :storyPoints,
                    :estimateDays,
                    :estimateMinutes,
                    :boardId,
                    :globalSortIndex,
                    :parentId,
                    :projectId,
                    :createdBy)
                  """;

        var parameters = new MapSqlParameterSource();
        parameters.addValue("id", task.getId());
        parameters.addValue("title", task.getTitle());
        parameters.addValue("description", task.getDescription());
        parameters.addValue("assignee", task.getAssignee());
        parameters.addValue("status", task.getStatus());
        parameters.addValue("taskTypeId", task.getTaskType().name());
        parameters.addValue("priority", task.getPriority().name());
        parameters.addValue("storyPoints", task.getStoryPoints());
        parameters.addValue("estimateDays", task.getEstimateDays());
        parameters.addValue("estimateMinutes", task.getEstimateMinutes());
        parameters.addValue("boardId", task.getBoardId());
        parameters.addValue("globalSortIndex", null);
        parameters.addValue("parentId", null);
        parameters.addValue("projectId", task.getProjectId());
        parameters.addValue("createdBy", task.getCreatedBy());

        jdbcTemplate.update(sql, parameters);
    }

    public void insertIntoBoardTask(String taskId, int boardId, int sortIndex) {
        var sql = """
                INSERT INTO BOARD_TASKS
                (TASK_ID, BOARD_ID, SORT_INDEX)
                VALUES
                (:taskId, :boardId, :sortIndex)
                """;

        jdbcTemplate.update(sql, Map.of(
                "taskId", taskId,
                "boardId", boardId,
                "sortIndex", sortIndex
        ));
    }

    public List<Task> getTasksForBoard(int boardId, UUID projectId) {
        var sql = """
                SELECT ID,
                       TITLE,
                       STATUS,
                       ASSIGNEE,
                       STORY_POINTS,
                       TASK_TYPE_ID,
                       PRIORITY,
                       ESTIMATE_DAYS,
                       ESTIMATE_MINUTES
                FROM TASKS
                WHERE PROJECT_ID = :projectId AND BOARD_ID = :boardId
                """;

        return jdbcTemplate.query(sql, Map.of(
                "projectId", projectId,
                "boardId", boardId
        ), getTasksForBoardRowMapper());
    }

    private RowMapper<Task> getTasksForBoardRowMapper() {
        return (rs, rowNum) -> {
            return new Task(
                    rs.getString("ID"),
                    rs.getString("TITLE"),
                    (UUID) rs.getObject("ASSIGNEE"),
                    null,
                    rs.getString("STATUS"),
                    TaskType.valueOf(rs.getString("TASK_TYPE_ID")),
                    TaskPriority.valueOf(rs.getString("PRIORITY")),
                    rs.getDouble("STORY_POINTS"),
                    rs.getInt("ESTIMATE_DAYS"),
                    rs.getInt("ESTIMATE_MINUTES"),
                    null,
                    null,
                    null,
                    null,
                    null);
        };
    }

    public Integer getMaxIdUsedForPrefix(String prefix) {
        var sql = "SELECT MAX_NUMBER FROM ID_TRACK WHERE PREFIX = :prefix";
        return jdbcTemplate.queryForObject(sql, Map.of("prefix", prefix), Integer.class);
    }

    public boolean queryIdTrack(String prefix) {
        var sql = "SELECT MAX_NUMBER FROM ID_TRACK WHERE PREFIX = :prefix";
        return jdbcTemplate.queryForList(sql, Map.of("prefix", prefix), Object[].class).isEmpty();
    }

    public void insertTrackIdForFirstTaskInProject(String prefix, int max) {

        var sql = "INSERT INTO ID_TRACK (MAX_NUMBER, PREFIX) VALUES (:max, :prefix)";

        jdbcTemplate.update(sql, Map.of(
                "max", max,
                "prefix", prefix));
    }

    public void incrementMaxForPrefix(String prefix, int max) {
        var sql = "UPDATE ID_TRACK SET MAX_NUMBER = :max WHERE PREFIX = :prefix";

        jdbcTemplate.update(sql, Map.of(
                "max", max,
                "prefix", prefix));

    }

    //dont really need boardId i guess
    // there can be only one taskId->sortIndex but we need the list
    public Map<String, Integer> getTaskSortIndexOnTable(List<String> taskIds, int boardId) {
        var sql = "SELECT TASK_ID, SORT_INDEX FROM BOARD_TASKS WHERE TASK_ID IN (:taskIds) AND BOARD_ID = :boardId";
        var parameters = new MapSqlParameterSource()
                .addValue("taskIds", taskIds)
                .addValue("boardId", boardId);

        RowMapper<Map.Entry<String, Integer>> rowMapper = (rs, rowNum) -> Map.entry(
                rs.getString("TASK_ID"),
                rs.getInt("SORT_INDEX")
        );
        List<Map.Entry<String, Integer>> entries = jdbcTemplate.query(sql, parameters, rowMapper);

        return entries.stream()
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    public void deleteTaskFromBoardTask(String taskId) {
        var sql = """
                DELETE FROM BOARD_TASKS WHERE TASK_ID = :taskId
                """;
        jdbcTemplate.update(sql, Map.of("taskId", taskId));
    }


    public void updateSortIndexInColumn(List<APIUpdateTaskSortIndexRequest> newTaskWithChangedOrder) {
        var sql = """
                UPDATE BOARD_TASKS SET SORT_INDEX = :sortIndex WHERE TASK_ID = :taskId
                """;

        var batchArgs = newTaskWithChangedOrder.stream()
                .map(task -> {
                    return new MapSqlParameterSource()
                            .addValue("sortIndex", task.sortIndex())
                            .addValue("taskId", task.taskId());
                }).toArray(SqlParameterSource[]::new);

        jdbcTemplate.batchUpdate(sql, batchArgs);
    }

    public void updateStatus(String taskId, String newStatus) {
        var sql = """
                UPDATE TASKS SET STATUS = :status WHERE ID = :taskId
                """;

        jdbcTemplate.update(sql, Map.of("taskId", taskId, "status", newStatus));
    }

    public Task selectTaskById(String taskId) {
        var sql = """
                SELECT ID,
                       TITLE,
                       STATUS,
                       DESCRIPTION,
                       ASSIGNEE,
                       STORY_POINTS,
                       TASK_TYPE_ID,
                       PRIORITY,
                       BOARD_ID,
                       ESTIMATE_DAYS,
                       ESTIMATE_MINUTES
                FROM TASKS
                WHERE ID = :id 
                """;

        return jdbcTemplate.queryForObject(sql, Map.of("id", taskId), (rs, num) -> {
            return new Task(
                    rs.getString("ID"),
                    rs.getString("TITLE"),
                    (UUID) rs.getObject("ASSIGNEE"),
                    rs.getString("DESCRIPTION"),
                    rs.getString("STATUS"),
                    TaskType.valueOf(rs.getString("TASK_TYPE_ID")),
                    TaskPriority.valueOf(rs.getString("PRIORITY")),
                    rs.getDouble("STORY_POINTS"),
                    rs.getInt("ESTIMATE_DAYS"),
                    rs.getInt("ESTIMATE_MINUTES"),
                    rs.getInt("BOARD_ID"),
                    null,
                    null,
                    null,
                    null);
        });
    }

    public void updateTask(Task task) {
        var sql = """
                UPDATE TASKS
                SET TITLE = :title,
                    ASSIGNEE = :assignee,
                    STATUS = :status,
                    TASK_TYPE_ID = :taskType,
                    DESCRIPTION = :description,
                    PRIORITY = :priority,
                    STORY_POINTS = :storyPoints,
                    ESTIMATE_DAYS = :estimateDays
                WHERE ID = :taskId 
                """;
        var map = new MapSqlParameterSource();
        map.addValue("title", task.getTitle());
        map.addValue("assignee", task.getAssignee());
        map.addValue("status", task.getStatus());
        map.addValue("taskType", task.getTaskType().name());
        map.addValue("description", task.getDescription());
        map.addValue("priority", task.getPriority().name());
        map.addValue("storyPoints", task.getStoryPoints());
        map.addValue("estimateDays", task.getEstimateDays());
        map.addValue("taskId", task.getId());

        jdbcTemplate.update(sql, map);

    }

    public void deleteTask(String taskId) {
        var sql = """
                DELETE FROM TASKS WHERE ID = :taskId
                """;
        jdbcTemplate.update(sql, Map.of("taskId", taskId));
    }

    public List<Map<UUID, Integer>> selectCountOfTasks(Set<UUID> projectIds) {
        var sql = """
                SELECT PROJECT_ID, COUNT(ID) AS TASK_COUNT FROM TASKS
                WHERE PROJECT_ID IN (:projectIds)
                GROUP BY PROJECT_ID
                """;
        RowMapper<Map<UUID, Integer>> mapper = (rs, row) -> Map.of(
                (UUID) rs.getObject("PROJECT_ID"),
                rs.getInt("TASK_COUNT")
        );
        return jdbcTemplate.query(sql, Map.of("projectIds", projectIds), mapper);
    }

    public List<Task> getTasksInProject(UUID projectId) {
        var sql = """
                SELECT ID,
                       TITLE,
                       STATUS,
                       ASSIGNEE,
                       STORY_POINTS,
                       TASK_TYPE_ID,
                       PRIORITY,
                       ESTIMATE_DAYS,
                       ESTIMATE_MINUTES
                FROM TASKS
                WHERE PROJECT_ID = :projectId
                """;

        return jdbcTemplate.query(sql, Map.of(
                "projectId", projectId
        ), getTasksForBoardRowMapper());
    }
}
