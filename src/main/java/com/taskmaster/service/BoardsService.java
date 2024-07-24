package com.taskmaster.service;

import com.taskmaster.api.web.v1.model.APIBoard;
import com.taskmaster.api.web.v1.model.APIBoardIdentity;
import com.taskmaster.api.web.v1.model.APICreateBoardRequest;
import com.taskmaster.domain.BoardsDAO;
import com.taskmaster.domain.model.BoardColumn;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardsService {
    private final BoardsDAO boardsDAO;
    private final ColumnService columnService;
    private final TaskService taskService;

    public APIBoard getMostRecentBoard(UUID userId, UUID projectId) {
        var recentBoardJoin = boardsDAO.getRecentBoard(projectId, userId);

        if (recentBoardJoin.isEmpty()) return null;

        var columns = recentBoardJoin.stream().map(rb -> {
            return new BoardColumn(rb.columnId(), rb.columnName(), rb.sortIndex());
        }).toList();

        var rb = recentBoardJoin.get(0);

        var tasks = taskService.getTasksForBoard(rb.id(), projectId);

        return new APIBoard(rb.id(), rb.name(), rb.description(), rb.projectId(), columns, tasks);
    }

    @Transactional
    public void createBoard(UUID userId, UUID projectId, APICreateBoardRequest createBoardRequest) {
        int boardId = boardsDAO.createBoard(userId, projectId, createBoardRequest);
        columnService.insertDefaultBoardColumns(boardId);
        //mark recent
        boardsDAO.createRecent(boardId, projectId, userId);
    }

    public List<APIBoardIdentity> getAllBoardsUnderProject(UUID projectId) {
        return boardsDAO.selectBoardsOfProject(projectId)
                .stream()
                .map(b -> new APIBoardIdentity(b.id(), b.name()))
                .toList();
    }

}
