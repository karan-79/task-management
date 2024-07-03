import {Task} from "@/features/Project/types.ts";
import {FC} from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/Card";
import {Avatar, AvatarFallback} from "@/components/Avatar/Avatar.tsx";
import {Draggable} from "@hello-pangea/dnd";

type Props = {
    task: Task
    index: number
}

const TaskCard: FC<Props> = ({task, index}) => {


    return <Draggable draggableId={task.id} index={index}>
        {
            (provided, snapshot) => {
                return <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Card
                        className="mb-2 p-0 hover:bg-gray-200">
                        <CardHeader className="pl-4 pt-4">
                            <CardTitle variant="h5">{task.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {task.storyPoints &&
                                <p>Story Points: {task.storyPoints || "-"}</p>}
                            {task.estimateDays &&
                                <p>Estimate: {task.estimateDays} days</p>}
                            {task.estimateMins &&
                                <p>Estimate: {task.estimateMins} mins</p>}
                        </CardContent>
                        <CardFooter className="mb-1 pb-1">
                            <span>{task.id}</span>
                            <div className="ml-auto flex">

                                <Avatar>
                                    <AvatarFallback>SM</AvatarFallback>
                                </Avatar>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            }
        }
    </Draggable>
}

export default TaskCard