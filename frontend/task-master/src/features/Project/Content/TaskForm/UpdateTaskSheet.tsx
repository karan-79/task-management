import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/Sheet";
import TaskFormInputs from "@/features/Project/Content/TaskForm/TaskFormInputs.tsx";
import { Button } from "@/components/Button";
import Typography from "@/components/Typography";
import { PencilIcon } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { Task } from "@/features/Project/types.ts";
import { getTaskById, updateTask } from "@/service/taskService.ts";
import { useTaskForm } from "@/features/Project/Content/TaskForm/TaskFormProvider/TaskFormProvider.tsx";
import TaskDetailsView from "@/features/Project/Content/TaskForm/TaskDetailsView.tsx";

type Props = {
  open: boolean;
  onClose: (task?: Task, isUpdate?: boolean) => void;
  taskId: string;
};

const UpdateTaskSheet: FC<Props> = ({ open, onClose, taskId }) => {
  const { setForm, form, checkIfFormHasErrors } = useTaskForm();

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    getTaskById(taskId).then(setForm);
  }, []);

  const handleUpdate = () => {
    if (checkIfFormHasErrors()) return;
    const task = { ...form, id: taskId };
    updateTask(task).then(() => onClose(task, true));
  };
  return (
    <Sheet open={open} onOpenChange={() => onClose()}>
      <SheetContent className="min-w-[600px]">
        <SheetHeader>
          <SheetTitle>
            <div className="flex gap-4 items-center">
              <Typography variant="h4">{taskId}</Typography>
              {!edit && (
                <Button variant="ghost" onClick={() => setEdit(true)}>
                  <PencilIcon className="h-5 w-5" />
                </Button>
              )}
            </div>
          </SheetTitle>
        </SheetHeader>
        {edit ? <TaskFormInputs /> : <TaskDetailsView {...form} />}
        <SheetFooter>
          {edit && (
            <div className="flex gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setEdit(false)}
              >
                Cancel
              </Button>
              <Button type="button" onClick={handleUpdate}>
                Update changes
              </Button>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default UpdateTaskSheet;
