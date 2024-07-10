package com.taskmaster.domain;

import com.taskmaster.domain.mapper.ProjectsMapper;
import com.taskmaster.domain.model.Project;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class ProjectsDAO {

    private final NamedParameterJdbcTemplate jdbcTemplate;
    private final ProjectsMapper projectsMapper;


    public UUID saveProject(Project project) {

        var sql = """
                INSERT INTO PROJECTS
                (GUID, NAME, SHORT_NAME, TYPE, DESCRIPTION, OWNER_ID)
                VALUES
                (:guid, :name, :short_name, :type, :description, :owner)
                """;

        var map = new MapSqlParameterSource();
        map.addValue("name", project.getName());
        map.addValue("guid", project.getGuid());
        map.addValue("short_name", project.getShortName());
        map.addValue("description", project.getDescription());
        map.addValue("type", project.getType());
        map.addValue("owner", project.getOwnerId());

        jdbcTemplate.update(sql, map);
        return project.getGuid();

    }

    @SneakyThrows
    public List<Project> getAllProjectsForUser(UUID userId) {
        var sql = """
                SELECT * FROM PROJECTS WHERE OWNER_ID = :owner
                """;

         return jdbcTemplate.query(sql, Map.of("owner", userId), projectsMapper);
    }

    public Project getById(UUID projectId) { //id should of the person having acces to project

        var sql = "SELECT * FROM PROJECTS WHERE GUID = :guid";

        return jdbcTemplate.queryForObject(sql, Map.of("guid", projectId), projectsMapper);
    }

    public String getShortName(UUID projectId) {
        var sql = "SELECT SHORT_NAME FROM PROJECTS WHERE GUID = :guid";
        return jdbcTemplate.queryForObject(sql, Map.of("guid", projectId), String.class);
    }

    public void updateProjectDetails(Project project) {
        var sql = """
               UPDATE PROJECTS 
               SET NAME = :name,
                   DESCRIPTION = :description,
                   TYPE = :type
               WHERE GUID = :guid
                """;
        var map = new MapSqlParameterSource();
        map.addValue("name", project.getName());
        map.addValue("description", project.getDescription());
        map.addValue("type", project.getType());
        map.addValue("guid", project.getGuid());

        jdbcTemplate.update(sql, map);
    }
}
