package com.taskmaster.domain;

import com.taskmaster.domain.mapper.ProjectsMapper;
import com.taskmaster.domain.model.Project;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
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
                (GUID, NAME, SHORT_NAME, DESCRIPTION, OWNER_ID)
                VALUES
                (:guid, :name, :short_name, :description, :owner)
                """;

        var map = new MapSqlParameterSource();
        map.addValue("name", project.name());
        map.addValue("guid", project.guid());
        map.addValue("short_name", project.shortName());
        map.addValue("description", project.description());
        map.addValue("owner", project.ownerId());

        jdbcTemplate.update(sql, map);
        return project.guid();

    }

    @SneakyThrows
    public List<Project> getAllProjectsForUser(UUID userId) {
        var sql = """
                SELECT * FROM PROJECTS WHERE OWNER_ID = :owner
                """;

         return jdbcTemplate.query(sql, Map.of("owner", userId), projectsMapper);
    }


}
