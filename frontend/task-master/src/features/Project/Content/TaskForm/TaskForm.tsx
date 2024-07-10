import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/Sheet";
import { Button } from "@/components/Button";
import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { Task } from "@/features/Project/types.ts";
import { UUID } from "@/types/generalTypes.ts";
import { TaskForm as TTaskForm, TaskFormErrors } from "./types.ts";
import {
  groupErrorsByKeys,
  initialState,
  validateTaskForm,
} from "@/features/Project/Content/TaskForm/utils.ts";
import { createTask, getTaskById, updateTask } from "@/service/taskService.ts";
import TaskFormInputs from "@/features/Project/Content/TaskForm/TaskFormInputs.tsx";
import {
  CreateTaskSheetState,
  isTaskSheetOpenForUpdate,
} from "../Board/types.ts";

type Props = {
  open: boolean;
  onClose: (task?: Task, isUpdate?: boolean) => void;
  sheetState: CreateTaskSheetState;
  projectId: UUID;
  boardId: number;
  status: string;
};

//TODO clean up if got time left
const TaskForm: FC<Props> = ({
  open,
  sheetState,
  boardId,
  projectId,
  onClose,
  status,
}) => {
  const isFormForUpdate = isTaskSheetOpenForUpdate(sheetState);
  const [form, setForm] = useState<TTaskForm>(initialState(status));

  const [errors, setErrors] = useState<
    Record<keyof TTaskForm, TaskFormErrors[]>
  >({} as any);

  useEffect(() => {
    if (isTaskSheetOpenForUpdate(sheetState)) {
      //getById
      getTaskById(sheetState.id).then(setForm);
    }
  }, []);

  const getHelperText = (field: keyof TTaskForm) => {
    if (
      !errors ||
      !errors[field] ||
      (errors[field] as TaskFormErrors[]).length <= 0
    )
      return undefined;

    return errors[field][0].message as string;
  };

  const hasError = (field: keyof TTaskForm) => {
    return (
      errors && errors[field] && (errors[field] as TaskFormErrors[]).length > 0
    );
  };

  const clearError = (field: keyof TTaskForm) => {
    setErrors((prev) => {
      delete prev[field];
      return prev;
    });
  };

  const debouncedFormChange = useCallback(debounce(setForm, 500), []);

  const handleFieldChange =
    (field: keyof TTaskForm) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string) => {
      clearError(field);
      if (typeof e === "string") {
        return debouncedFormChange((prevState) => ({
          ...prevState,
          [field]: e.trim(),
        }));
      }
      debouncedFormChange((prevState) => ({
        ...prevState,
        [field]: e.target.value.trim(),
      }));
    };

  const checkIfFormHasErrors = () => {
    const errors = validateTaskForm(form);
    if (errors.length > 0) {
      setErrors(groupErrorsByKeys(errors));
      return true;
    }
    return false;
  };

  const handleSubmit = () => {
    if (checkIfFormHasErrors()) return;
    createTask(form, boardId, projectId).then((id: string) =>
      onClose({ ...form, id })
    );
  };

  const handleUpdate = () => {
    if (checkIfFormHasErrors()) return;
    if (isTaskSheetOpenForUpdate(sheetState)) {
      const task = { ...form, id: sheetState.id };
      updateTask(task).then(() => onClose(task, true));
    }
  };

  return (
    <Sheet open={open} onOpenChange={() => onClose()}>
      <SheetContent className="min-w-[600px]">
        <SheetHeader>
          <SheetTitle>Create task</SheetTitle>
        </SheetHeader>
        <TaskFormInputs
          form={form}
          handleFieldChange={handleFieldChange}
          hasError={hasError}
          getHelperText={getHelperText}
          setForm={setForm}
        />
        <SheetFooter>
          {isFormForUpdate ? (
            <Button type="button" onClick={handleUpdate}>
              Update changes
            </Button>
          ) : (
            <Button type="button" onClick={handleSubmit}>
              Save changes
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default TaskForm;
