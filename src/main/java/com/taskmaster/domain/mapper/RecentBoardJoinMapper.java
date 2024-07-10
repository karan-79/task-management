package com.taskmaster.domain.mapper;

import com.taskmaster.domain.model.RecentBoardJoin;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

@Component
public class RecentBoardJoinMapper implements RowMapper<RecentBoardJoin> {
    @Override
    public RecentBoardJoin mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new RecentBoardJoin(
                rs.getInt("ID"),
                rs.getString("NAME"),
                (UUID) rs.getObject("PROJECT_ID"),
                rs.getString("DESCRIPTION"),
                rs.getInt("COLUMN_ID"),
                rs.getString("COLUMN_NAME"),
                rs.getInt("SORT_INDEX")
        );
    }
}
