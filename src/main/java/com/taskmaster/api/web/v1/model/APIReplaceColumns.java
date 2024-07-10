package com.taskmaster.api.web.v1.model;

import com.taskmaster.domain.model.BoardColumn;

import java.util.List;

public record APIReplaceColumns (List<BoardColumn> columns){
}
