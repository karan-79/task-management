import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/Sheet";
import TaskFormInputs from "@/features/Project/Content/TaskForm/TaskFormInputs.tsx";
import { Button } from "@/components/Button";
import { FC, useEffect } from "react";
import { Task } from "@/features/Project/types.ts";
import { useTaskForm } from "@/features/Project/Content/TaskForm/TaskFormProvider/TaskFormProvider.tsx";
import { createTask } from "@/service/taskService.ts";
import { UUID } from "@/types/generalTypes.ts";
import { useParams } from "react-router-dom";
import { useProject } from "@/features/Project/ProjectProvider/ProjectProvider.tsx";

type Props = {
  open: boolean;
  onClose: (task?: Task, isUpdate?: boolean) => void;
  boardId: number;
  status: string;
};
const CreateTaskSheet: FC<Props> = ({ status, boardId, onClose, open }) => {
  const { checkIfFormHasErrors, form, setForm } = useTaskForm();

  const { projectId } = useProject();
  const handleSubmit = () => {
    if (checkIfFormHasErrors()) return;
    createTask(form, boardId, projectId).then((id: string) =>
      onClose({ ...form, id }),
    );
  };

  useEffect(() => {
    setForm((prev) => ({ ...prev, status }));
  }, []);

  return (
    <Sheet open={open} onOpenChange={() => onClose()}>
      <SheetContent className="min-w-[600px]">
        <SheetHeader>
          <SheetTitle>Create new task</SheetTitle>
        </SheetHeader>
        <TaskFormInputs />
        <SheetFooter>
          <Button type="button" onClick={handleSubmit}>
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CreateTaskSheet;
