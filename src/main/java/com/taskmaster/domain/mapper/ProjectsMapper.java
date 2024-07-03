package com.taskmaster.domain.mapper;

import com.taskmaster.domain.model.Project;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.UUID;

@Component
public class ProjectsMapper implements RowMapper<Project> {
    @Override
    public Project mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new Project(
                rs.getInt("ID"),
                (UUID) rs.getObject("GUID"),
                rs.getString("NAME"),
                rs.getString("DESCRIPTION"),
                rs.getString("SHORT_NAME"),
                rs.getString("TYPE"),
                (UUID) rs.getObject("OWNER_ID"),
                ((Date) rs.getObject("CREATED_AT")).toLocalDate()
        );
    }
}
