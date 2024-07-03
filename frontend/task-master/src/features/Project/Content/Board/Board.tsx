import Typography from "@/components/Typography";
import { Board as TBoard } from "@/features/Project/types.ts";
import { FC, useMemo, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { mockTasks } from "@/service/data.ts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import { Avatar, AvatarFallback } from "@/components/Avatar/Avatar.tsx";
import TaskLane from "@/features/Project/Content/Board/TaskLane.tsx";

type Props = {
  board: TBoard;
};
const Board: FC<Props> = ({ board }) => {
  const totalLanes = board.columns.length;
  const [boardColumns, setBoardColumns] = useState(board.columns);

  const columns = useMemo(() => {
    return boardColumns.sort((a, b) => (a.sortIndex > b.sortIndex ? 1 : -1));
  }, [boardColumns]);

  const [tasks, setTasks] = useState(mockTasks);

  //TODO need to think how to persist the order of tasks
  const handleDragEnd = ({ destination, source, draggableId, type }) => {
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return;

    if (type === "column") {
      setBoardColumns((prev) => {
        const c = prev.find((col) => col.name === draggableId);
        if (!c) return;
        c.sortIndex = destination.index;
        return prev;
      });
      return;
    }

    const newIndex = destination.index;
    if (destination.droppableId === source.droppableId) {
      //means sort order of tasks changed
      setTasks((prev) => {
        const task = prev.find((t) => t.id === draggableId);
        if (!task) return prev;
        console.log(task, newIndex);
        task.sortOrder = newIndex; // i think we may need to think about this
        return prev;
      });
      return;
    }
    // lane is changed
    const drop = destination.droppableId; // is column name equal to task status
    setTasks((prev) => {
      const task = prev.find((t) => t.id === draggableId);
      if (!task) return prev;
      console.log(task, newIndex);
      task.sortOrder = newIndex; // i think we may need to think about this
      task.status = drop;
      return prev;
    });
  };

  return (
    <div className="flex-1 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <Typography variant="h2">{board.name}</Typography>
          <Typography variant="p">{board.description}</Typography>
        </div>
        <div className="flex space-x-2">
          {/*    TODO other buttons on head sections*/}
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="board" type="column">
          {(provided) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`flex min-w-full gap-4 min-h-60`}
              >
                {columns.map((c, i) => (
                  <TaskLane key={c.name} column={c} index={i} tasks={tasks} />
                ))}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Board;
