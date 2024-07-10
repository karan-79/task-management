package com.taskmaster.domain;

import com.taskmaster.domain.model.BoardColumn;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@RequiredArgsConstructor
public class ColumnDAO {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    public int insertColumn(String name, int boardId, int sortIndex) {
        var sql = """
                INSERT INTO BOARD_COLUMNS
                (BOARD_ID, NAME, SORT_INDEX)
                VALUES
                (:board_id, :name, :sort_index)
                RETURNING ID
                 """;

        var map = Map.of(
                "board_id", boardId,
                "name", name,
                "sort_index", sortIndex
        );
        return jdbcTemplate.query(sql, map, (rs, n) -> {
            return rs.getInt("ID");
        }).getFirst();

    }


    public void insertDefaultBoardColumns(int boardId) {
        var sql = """
                INSERT INTO BOARD_COLUMNS 
                (BOARD_ID, NAME, SORT_INDEX)
                VALUES
                (:boardId, 'TODO', 1),
                (:boardId, 'IN PROGRESS', 2),
                (:boardId, 'DONE', 3)
                """;
        jdbcTemplate.update(sql, Map.of("boardId", boardId));
    }

    public List<BoardColumn> getAllColumns(int boardId) {
        var sql = """
                 SELECT * FROM BOARD_COLUMNS WHERE BOARD_ID = :boardId
                """;
        return jdbcTemplate.query(sql, Map.of("boardId", boardId), getBoardColumnMapper());
    }

    private RowMapper<BoardColumn> getBoardColumnMapper() {
        return ((rs, rowNum) -> {
            return new BoardColumn(
                    rs.getInt("ID"),
                    rs.getString("NAME"),
                    rs.getInt("SORT_INDEX")
            );
        });
    }

    public void updateColumnsSortIndex(List<BoardColumn> cols, int boardId) {
        String sql = "UPDATE BOARD_COLUMNS SET SORT_INDEX = :sortIndex WHERE ID = :id AND BOARD_ID = :boardId";

        SqlParameterSource[] batchParams = cols.stream()
                .map(col -> new MapSqlParameterSource()
                        .addValue("id", col.id())
                        .addValue("boardId", boardId)
                        .addValue("sortIndex", col.sortIndex()))
                .toArray(SqlParameterSource[]::new);

        jdbcTemplate.batchUpdate(sql, batchParams);
    }

    public void deleteColumn(Integer boardId, Integer columnId) {
        var sql = "DELETE FROM BOARD_COLUMNS WHERE ID = :colId AND BOARD_ID = :boardId";

        jdbcTemplate.update(sql, Map.of(
                "colId", columnId,
                "boardId", boardId));
    }
}
