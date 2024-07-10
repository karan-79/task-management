import { Column, Task } from "@/features/Project/types.ts";
import { FC } from "react";
import Typography from "@/components/Typography";
import TaskCard from "@/features/Project/Content/Board/TaskComponents/TaskCard.tsx";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { ScrollArea, ScrollBar } from "@/components/ScrollArea";
import { Button } from "@/components/Button";
import { GripVertical, Trash } from "lucide-react";
import { isEmpty } from "lodash";
import CreateTaskButton from "@/features/Project/Content/Board/CreateTaskButton.tsx";
import { UUID } from "@/types/generalTypes";

type Props = {
  column: Column;
  tasks: Task[];
  index: number;
  onDeleteColumn: (id: number) => void;
  onCreateTask: () => void;
  onUpdate: (id: UUID) => void;
};
const TaskLane: FC<Props> = ({
  column,
  tasks,
  index,
  onDeleteColumn,
  onCreateTask,
  onUpdate,
}) => {
  const sortedTasks = tasks.sort((a, b) =>
    a.sortIndex < b.sortIndex ? -1 : 1
  );
  return (
    // <div className="w-64 shadow">
    <Draggable draggableId={column.name} index={index}>
      {(provided) => {
        const dragProvided = provided;
        return (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            className="w-64 h-full flex flex-col"
          >
            <Droppable droppableId={column.name}>
              {(provided) => {
                return (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="rounded-md border-2 flex flex-col h-full flex-shrink-0"
                  >
                    <div className="sticky top-0 z-10 flex bg-muted/100 p-2 rounded items-center">
                      <div
                        {...dragProvided.dragHandleProps}
                        className="w-full flex items-center"
                      >
                        <GripVertical className="mr-1" />
                        <Typography variant="h6">{column.name}</Typography>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDeleteColumn(column.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="p-2 flex-grow overflow-hidden">
                      <ScrollArea className="h-full">
                        {isEmpty(sortedTasks) && (
                          <CreateTaskButton onClick={onCreateTask} />
                        )}
                        {sortedTasks.map((t, index) => (
                          <TaskCard
                            task={t}
                            index={index}
                            key={t.id}
                            onUpdate={() => onUpdate(t.id)}
                          />
                        ))}
                        {provided.placeholder}
                        <ScrollBar orientation="vertical" />
                      </ScrollArea>
                    </div>
                  </div>
                );
              }}
            </Droppable>
          </div>
        );
      }}
    </Draggable>
    // </div>
  );
};

export default TaskLane;
