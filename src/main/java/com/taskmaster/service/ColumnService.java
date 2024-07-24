package com.taskmaster.service;

import com.taskmaster.api.web.v1.model.APICreateColumnRequest;
import com.taskmaster.domain.ColumnDAO;
import com.taskmaster.domain.model.BoardColumn;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ColumnService {

    private final ColumnDAO columnDAO;

    public BoardColumn createColumn(int boardId, APICreateColumnRequest createColumnRequest) {
        var id = columnDAO.insertColumn(createColumnRequest.name(),boardId, createColumnRequest.sortIndex());
        return new BoardColumn(id, createColumnRequest.name(), createColumnRequest.sortIndex());
    }

    public void changeColumnsOrder(int boardId, List<BoardColumn> newCols) {
        // delete previous

        // insert new
        columnDAO.updateColumnsSortIndex(newCols, boardId);
    }

    public void insertDefaultBoardColumns(int boardId) {
        columnDAO.insertDefaultBoardColumns(boardId);
    }

    public List<BoardColumn> getBoardColumns(int boardId) {
        return columnDAO.getAllColumns(boardId);
    }

    public void deleteColumn(Integer boardId, Integer columnId) {
        columnDAO.deleteColumn(boardId, columnId);
    }
}
