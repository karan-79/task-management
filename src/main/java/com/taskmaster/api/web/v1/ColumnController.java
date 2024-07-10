package com.taskmaster.api.web.v1;

import com.taskmaster.api.web.v1.model.APICreateColumnRequest;
import com.taskmaster.api.web.v1.model.APIReplaceColumns;
import com.taskmaster.config.AuthPrincipal;
import com.taskmaster.domain.model.BoardColumn;
import com.taskmaster.service.ColumnService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/v1/boards/{boardId}/columns")
@RequiredArgsConstructor
public class ColumnController {

    private final ColumnService columnService;


    @PostMapping
    public BoardColumn createColumn(@AuthenticationPrincipal AuthPrincipal principal, @PathVariable Integer boardId, @RequestBody APICreateColumnRequest createColumnRequest) {
        // can check for access to project here usign project id
        return columnService.createColumn(boardId, createColumnRequest);
    }

    @PutMapping
    public void updateColumnsOrder(@AuthenticationPrincipal AuthPrincipal principal, @PathVariable Integer boardId, @RequestBody APIReplaceColumns replaceColumns) {
        columnService.changeColumnsOrder(boardId, replaceColumns.columns());
    }

    @DeleteMapping("/{columnId}")
    public void deleteColumn(@AuthenticationPrincipal AuthPrincipal principal, @PathVariable Integer boardId, @PathVariable Integer columnId) {
        columnService.deleteColumn(boardId, columnId);
    }

}
