import { Column, Task } from "@/features/Project/types.ts";
import { FC } from "react";
import Typography from "@/components/Typography";
import TaskCard from "@/features/Project/Content/Board/TaskCard.tsx";
import { Draggable, Droppable } from "@hello-pangea/dnd";

type Props = {
  column: Column;
  tasks: Task[];
  index: number;
};
const TaskLane: FC<Props> = ({ column, tasks, index }) => {
  return (
    <div>
      <Draggable draggableId={column.name} index={index}>
        {(provided) => {
          const dragProvided = provided;
          return (
            <div {...provided.draggableProps} ref={provided.innerRef}>
              <Droppable droppableId={column.name}>
                {(provided) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="bg-gray-100 rounded flex flex-col"
                    >
                      <div
                        {...dragProvided.dragHandleProps}
                        className="bg-gray-200 p-2 rounded"
                      >
                        <Typography variant="h6">{column.name}</Typography>
                      </div>
                      <div className={`p-2`}>
                        {tasks
                          .filter((t) => t.status === column.name)
                          .sort((a, b) => (a.sortOrder < b.sortOrder ? -1 : 1))
                          .map((t, index) => (
                            <TaskCard task={t} index={index} key={t.id} />
                          ))}
                        {provided.placeholder}
                      </div>
                    </div>
                  );
                }}
              </Droppable>
            </div>
          );
        }}
      </Draggable>
    </div>
  );
};

export default TaskLane;
