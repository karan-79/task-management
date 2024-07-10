import { UUID } from "@/types/generalTypes.ts";
import { http } from "@/config/axiosConfig.ts";
import { Board, Column } from "@/features/Project/types.ts";
import { getData } from "@/utils.ts";
import { CreateBoardRequest, CreateColumnRequest } from "@/service/types.ts";
import board from "@/features/Project/Content/Board";

export const getRecentBoard = (projectId: UUID) => {
  return http
    .get<Board>(`/v1/projects/${projectId}/boards/recent`)
    .then(getData);
};

export const createBoard = (board: CreateBoardRequest, projectId: UUID) => {
  return http.post<void>(`/v1/projects/${projectId}/boards`, board);
};

export const createColumn = (boardId: number, column: CreateColumnRequest) => {
  return http
    .post<Column>(`/v1/boards/${boardId}/columns`, column)
    .then(getData);
};

export const updateColumns = (
  boardId: number,
  columns: CreateColumnRequest[]
) => {
  return http.put(`/v1/boards/${boardId}/columns`, { columns });
};

export const deleteColumn = (boardId: number, id: number) => {
  return http.delete(`/v1/boards/${boardId}/columns/${id}`);
};
