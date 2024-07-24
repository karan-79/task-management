import Typography from "@/components/Typography";
import { Board as TBoard, Column, Task } from "@/features/Project/types.ts";
import { FC, useMemo, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import TaskLane from "@/features/Project/Content/Board/TaskComponents/TaskLane.tsx";
import { Button } from "@/components/Button";
import { Plus } from "lucide-react";
import CreateColumn from "@/features/Project/Content/Board/CreateColumn.tsx";
import {
  createColumn,
  deleteColumn,
  updateColumns,
} from "@/service/boardService.ts";
import { ScrollArea, ScrollBar } from "@/components/ScrollArea";
import { UUID } from "@/types/generalTypes.ts";
import {
  isTaskSheetOpenForCreate,
  isTaskSheetOpenForView,
  TaskSheetState,
} from "./types";
import {
  getDeletedColumnState,
  groupTasksByStatus,
  reorderColumns,
  reorderTasksInSameLane,
  toUpdatedSortIndexRequest,
} from "./utils";
import { patchSortIndex, patchStatus } from "@/service/taskService";
import TaskFormProvider from "@/features/Project/Content/TaskForm/TaskFormProvider";
import CreateTaskSheet from "@/features/Project/Content/TaskForm/CreateTaskSheet.tsx";
import UpdateTaskSheet from "@/features/Project/Content/TaskForm/UpdateTaskSheet.tsx";

type Props = {
  board: TBoard;
  projectId: UUID;
};
const Board: FC<Props> = ({ board, projectId }) => {
  const [boardColumns, setBoardColumns] = useState<Column[]>(board.columns);
  const [createCol, setCreateCol] = useState(false);

  const columns = useMemo(() => {
    return boardColumns.sort((a, b) => (a.sortIndex > b.sortIndex ? 1 : -1));
  }, [boardColumns]);

  const [createTaskSheet, setCreateTaskSheet] = useState<TaskSheetState>({
    __tag: "CLOSE",
  });

  const [tasks, setTasks] = useState<Record<string, Task[]>>(
    groupTasksByStatus(board.tasks),
  );

  const handleCreateColumn = (name?: string) => {
    if (!name || name === "") return setCreateCol(false);
    createColumn(board.id, { name, sortIndex: boardColumns.length + 1 })
      .then((col: Column) => {
        setBoardColumns((prevState) => [...prevState, col]);
      })
      .finally(() => setCreateCol(false));
  };

  const handleDeleteColumn = (id: number) => {
    deleteColumn(board.id, id)
      .then(() => {
        const newCols = getDeletedColumnState(Array.from(columns), id);
        updateColumns(board.id, newCols).then(() => setBoardColumns(newCols));
      })
      .catch((e) => e);
  };

  const handleCloseTaskForm = (task?: Task, isUpdate?: boolean) => {
    if (!task) return setCreateTaskSheet({ __tag: "CLOSE" });

    if (isUpdate) {
      setTasks((prev: any) => ({
        ...prev,
        [task.status]: [
          ...(prev[task.status] as Task[]).filter((t) => t.id != task.id),
          task,
        ],
      }));
    } else {
      setTasks((prev: any) => ({
        ...prev,
        [task.status]: [...(prev[task.status] || []), task],
      }));
    }

    setCreateTaskSheet({ __tag: "CLOSE" });
  };

  //TODO need to think how to persist the order of tasks
  const handleDragEnd = ({ destination, source, draggableId, type }) => {
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return;

    if (type === "column") {
      const newColumns = reorderColumns(
        source.index,
        destination.index,
        Array.from(columns),
      );

      updateColumns(board.id, newColumns).then(() =>
        setBoardColumns(newColumns),
      );
      return;
    }
    const newIndex = destination.index;
    const sourceColumnId = source.droppableId;
    const destinationColumnId = destination.droppableId;
    if (destination.droppableId === source.droppableId) {
      const updatedTasksWithSortIndex = reorderTasksInSameLane(
        source.index,
        destination.index,
        Array.from(tasks[destinationColumnId]),
      );

      return patchSortIndex(
        updatedTasksWithSortIndex.map(toUpdatedSortIndexRequest),
      ).then(() =>
        setTasks((prev) => ({
          ...prev,
          [destinationColumnId]: updatedTasksWithSortIndex,
        })),
      );
    }

    // lane is changed
    const sourceTasks = Array.from(tasks[sourceColumnId]);
    const destinationTasks = Array.from(tasks[destinationColumnId] ?? []);

    const [movedTask] = sourceTasks.splice(source.index, 1);
    movedTask.status = destinationColumnId;
    destinationTasks.splice(destination.index, 0, movedTask);

    const updatedSourceTasks = sourceTasks.map((task, index) => ({
      ...task,
      sortIndex: index,
    }));

    const updatedDestinationTasks = destinationTasks.map((task, index) => ({
      ...task,
      sortIndex: index,
    }));

    patchStatus(movedTask.status, movedTask.id).then(() => {
      Promise.all([
        patchSortIndex(updatedSourceTasks.map(toUpdatedSortIndexRequest)),
        patchSortIndex(updatedDestinationTasks.map(toUpdatedSortIndexRequest)),
      ]).then(() =>
        setTasks((prev) => ({
          ...prev,
          [sourceColumnId]: updatedSourceTasks,
          [destinationColumnId]: updatedDestinationTasks,
        })),
      );
    });
  };

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="flex-shrink-0 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Typography variant="h2">{board.name}</Typography>
              <Typography variant="p">{board.description}</Typography>
            </div>
            <div className="flex space-x-2">
              {/*    TODO other buttons on head sections*/}
            </div>
          </div>
        </div>
        <div className="flex-grow overflow-hidden border rounded-md">
          <ScrollArea className=" h-full">
            <div className="flex gap-4 p-1 h-full">
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable
                  droppableId="board"
                  direction="horizontal"
                  type="column"
                >
                  {(provided) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="flex gap-4 h-full p-1"
                      >
                        {columns.map((c, i) => (
                          <TaskLane
                            column={c}
                            key={c.name}
                            index={i}
                            tasks={tasks[c.name] ?? []}
                            onUpdate={(id: string) =>
                              setCreateTaskSheet({
                                __tag: "OPEN",
                                state: "UPDATE",
                                id,
                              })
                            }
                            onDeleteColumn={handleDeleteColumn}
                            onCreateTask={() =>
                              setCreateTaskSheet({
                                __tag: "OPEN",
                                status: c.name,
                                state: "CREATE",
                              })
                            }
                          />
                        ))}
                        {provided.placeholder}
                        {createCol && (
                          <CreateColumn onClose={handleCreateColumn} />
                        )}
                        {!createCol && (
                          <Button
                            variant="secondary"
                            size="icon"
                            onClick={() => setCreateCol(true)}
                          >
                            <Plus />
                          </Button>
                        )}
                      </div>
                    );
                  }}
                </Droppable>
              </DragDropContext>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
      {isTaskSheetOpenForCreate(createTaskSheet) && (
        <TaskFormProvider>
          <CreateTaskSheet
            open={true}
            onClose={handleCloseTaskForm}
            boardId={board.id}
            status={createTaskSheet.status}
          />
        </TaskFormProvider>
      )}

      {isTaskSheetOpenForView(createTaskSheet) && (
        <TaskFormProvider>
          <UpdateTaskSheet
            open={true}
            taskId={createTaskSheet.id}
            onClose={handleCloseTaskForm}
            boardId={board.id}
          />
        </TaskFormProvider>
      )}
    </>
  );
};

export default Board;
