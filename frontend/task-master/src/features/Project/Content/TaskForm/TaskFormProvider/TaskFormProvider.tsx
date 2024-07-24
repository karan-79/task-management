import {
  ChangeEvent,
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from "react";
import {
  TaskForm,
  TaskFormErrors,
} from "@/features/Project/Content/TaskForm/types.ts";
import {
  groupErrorsByKeys,
  initialState,
  validateTaskForm,
} from "@/features/Project/Content/TaskForm/utils.ts";
import { debounce } from "lodash";

type TaskContext = {
  form: TaskForm;
  errors: Record<keyof TaskForm, TaskFormErrors[]>;
  setForm: Dispatch<SetStateAction<TaskForm>>;
  setErrors: Dispatch<SetStateAction<Record<keyof TaskForm, TaskFormErrors[]>>>;
};

const Context = createContext<TaskContext>({} as TaskContext);

const TaskFormProvider: FC<PropsWithChildren> = ({ children }) => {
  const [form, setForm] = useState<TaskForm>(initialState);

  const [errors, setErrors] = useState<
    Record<keyof TaskForm, TaskFormErrors[]>
  >({} as any);

  return (
    <Context.Provider value={{ form, setForm, errors, setErrors }}>
      {children}
    </Context.Provider>
  );
};

export default TaskFormProvider;

export const useTaskForm = () => {
  const { form, setForm, errors, setErrors } = useContext(Context);
  const getHelperText = (field: keyof TaskForm) => {
    if (
      !errors ||
      !errors[field] ||
      (errors[field] as TaskFormErrors[]).length <= 0
    )
      return undefined;

    return errors[field][0].message as string;
  };

  const hasError = (field: keyof TaskForm) => {
    return (
      errors && errors[field] && (errors[field] as TaskFormErrors[]).length > 0
    );
  };

  const clearError = (field: keyof TaskForm) => {
    setErrors((prev) => {
      delete prev[field];
      return prev;
    });
  };

  const debouncedFormChange = useCallback(debounce(setForm, 500), []);

  const handleFieldChange =
    (field: keyof TaskForm) =>
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

  return {
    form,
    setForm,
    checkIfFormHasErrors,
    hasError,
    handleFieldChange,
    getHelperText,
  };
};
