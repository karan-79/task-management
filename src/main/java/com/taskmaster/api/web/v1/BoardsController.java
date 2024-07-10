package com.taskmaster.api.web.v1;

import com.taskmaster.api.web.v1.model.APIBoard;
import com.taskmaster.api.web.v1.model.APICreateBoardRequest;
import com.taskmaster.api.web.v1.model.APICreateColumnRequest;
import com.taskmaster.config.AuthPrincipal;
import com.taskmaster.domain.model.Board;
import com.taskmaster.service.BoardsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/v1/projects/{projectId}/boards")
@RequiredArgsConstructor
public class BoardsController {

    private final BoardsService boardsService;

    @GetMapping("/recent")
    public APIBoard getRecentBoard(@PathVariable UUID projectId, @AuthenticationPrincipal AuthPrincipal principal) {
        return boardsService.getMostRecentBoard(principal.getUserId(), projectId);
    }

    @PostMapping
    public void createBoard(@AuthenticationPrincipal AuthPrincipal principal, @PathVariable UUID projectId, @RequestBody APICreateBoardRequest createBoardRequest) {
        boardsService.createBoard(principal.getUserId(), projectId, createBoardRequest);
    }


}
