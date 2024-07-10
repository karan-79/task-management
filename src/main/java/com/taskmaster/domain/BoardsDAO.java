package com.taskmaster.domain;

import com.taskmaster.api.web.v1.model.APICreateBoardRequest;
import com.taskmaster.domain.mapper.RecentBoardJoinMapper;
import com.taskmaster.domain.model.RecentBoardJoin;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class BoardsDAO {

    private final NamedParameterJdbcTemplate jdbcTemplate;
    private final RecentBoardJoinMapper mapper;

    public List<RecentBoardJoin> getRecentBoard(UUID projectId, UUID userId) {
        var sql = """
                SELECT 
                    B.ID,
                    B.NAME,
                    B.PROJECT_ID,
                    B.DESCRIPTION,
                    C.ID as COLUMN_ID,
                    C.NAME as COLUMN_NAME,
                    C.SORT_INDEX
                    FROM BOARDS B
                    JOIN BOARD_COLUMNS C ON B.ID = C.BOARD_ID
                    JOIN RECENT_BOARDS R ON B.ID = R.BOARD_ID
                    WHERE R.PROJECT_ID = :projectId AND R.USER_ID = :userId
                """;

        return jdbcTemplate.query(sql, Map.of(
                "projectId", projectId,
                "userId", userId), mapper);
    }


    // NO test with h2sql dialact differs
    public int createBoard(UUID userId, UUID projectId, APICreateBoardRequest request) {

        var sql = """
                INSERT INTO BOARDS 
                (NAME, PROJECT_ID, DESCRIPTION)
                VALUES
                (:name, :projectId, :description)
                RETURNING ID;
                """;
        var map = new MapSqlParameterSource();
        map.addValue("name", request.name());
        map.addValue("projectId", projectId);
        map.addValue("description", request.description());

        var keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(sql, map, keyHolder);

        return keyHolder.getKey().intValue();
    }


    public void createRecent(int boardId, UUID projectId, UUID userId) {
        var sql = """
                INSERT INTO RECENT_BOARDS
                (USER_ID, BOARD_ID, PROJECT_ID) 
                Values
                (:user_id, :board_id, :project_id) 
                 """;

        jdbcTemplate.update(sql, Map.of(
                "user_id", userId,
                "board_id", boardId,
                "project_id", projectId));
    }

    public void markRecent(int boardId, UUID projectId, UUID userId) {

    }

    public List<Map<UUID, Integer>> selectCountOfBoards(Set<UUID> projectIds) {
        var sql = """
                SELECT PROJECT_ID, COUNT(ID) AS BOARD_COUNT FROM BOARDS
                WHERE PROJECT_ID IN (:projectIds)
                GROUP BY PROJECT_ID
                """;
        RowMapper<Map<UUID, Integer>> mapper = (rs, row) -> Map.of(
                (UUID) rs.getObject("PROJECT_ID"),
                rs.getInt("BOARD_COUNT")
        );
        return jdbcTemplate.query(sql, Map.of("projectIds", projectIds), mapper);
    }
}
