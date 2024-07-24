package com.taskmaster.domain;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class ProjectMembersDAO {
    private final NamedParameterJdbcTemplate jdbcTemplate;


    public List<UUID> getProjectMembers(UUID projectId) {
        var sql = "SELECT USER_ID FROM PROJECT_MEMBERS WHERE PROJECT_ID = :projectId";
        return jdbcTemplate.queryForList(sql, Map.of("projectId", projectId), UUID.class);
    }

    public void insertPerson(UUID projectId, UUID userId) {
        var sql = """
                INSERT INTO PROJECT_MEMBERS 
                (USER_ID, PROJECT_ID)
                VALUES
                (:userId, :projectId)
                """;
        jdbcTemplate.update(sql, Map.of(
                "userId", userId,
                "projectId", projectId
        ));
    }


    public void deletePerson(UUID projectId, UUID userId) {
        var sql = "DELETE FROM PROJECT_MEMBERS WHERE USER_ID = :userId AND PROJECT_ID = projectId";

        jdbcTemplate.update(sql, Map.of(
                "userId", userId,
                "projectId", projectId
        ));
    }
}
