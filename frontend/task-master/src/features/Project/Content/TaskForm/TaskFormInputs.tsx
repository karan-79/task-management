import { TextField } from "@/components/TextField";
import TaskTypeSelect from "@/features/Project/Content/TaskForm/TaskTypeSelect.tsx";
import Typography from "@/components/Typography";
import AssigneeSearch from "@/features/Project/Content/TaskForm/AssigneeSearch";
import { Label } from "@/components/Label";
import { Textarea } from "@/components/TextArea";
import PrioritySelect from "@/features/Project/Content/TaskForm/PrioritySelect.tsx";
import { Person, Task } from "@/features/Project/types.ts";
import { FC, useEffect, useState } from "react";
import { Nullable } from "@/types/generalTypes.ts";
import { TaskForm } from "@/features/Project/Content/TaskForm/types.ts";

type Props = {
  hasError: (field: keyof TaskForm) => boolean;
  getHelperText: (field: keyof TaskForm) => string | undefined;
  handleFieldChange: (field: keyof TaskForm) => (e: any) => void;
  setForm: (val: any) => void;
  form: TaskForm;
};

const TaskFormInputs: FC<Props> = ({
  handleFieldChange,
  hasError,
  getHelperText,
  setForm,
  form,
}) => {
  const [person, setPerson] = useState<Nullable<Person>>(null);
  const handleOnSelectPerson = (person: Person) => {
    setPerson(person);
    setForm((prev) => ({ ...prev, assignee: person }));
  };

  useEffect(() => {
    setPerson(form.assignee);
  }, [form.assignee]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col">
        <TextField
          label="Title"
          name="title"
          defaultValue={form.title}
          error={hasError("title")}
          helperText={getHelperText("title")}
          placeholder="Enter title..."
          onChange={handleFieldChange("title")}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 items-center">
        <TaskTypeSelect
          value={form.taskType}
          error={hasError("taskType")}
          helperText={getHelperText("taskType")}
          onSelect={handleFieldChange("taskType")}
        />
        <div>
          <AssigneeSearch
            error={hasError("assignee")}
            helperText={getHelperText("assignee")}
            onSelect={handleOnSelectPerson}
            selectedPerson={person}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Description</Label>
        <Textarea
          rows={8}
          defaultValue={form.description}
          onChange={handleFieldChange("description")}
        />
        {hasError("description") && (
          <Typography variant="h6" className="text-destructive">
            {getHelperText("description")}
          </Typography>
        )}
      </div>
      <div className="grid grid-cols-2">
        <div className="flex flex-col">
          <PrioritySelect
            value={form.priority}
            onSelect={handleFieldChange("priority")}
          />
          {hasError("priority") && (
            <Typography variant="h6" className="text-destructive">
              {getHelperText("priority")}
            </Typography>
          )}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {form.taskType === "FEATURE" && (
          <div className="flex flex-col gap-2">
            <TextField
              label="Story points"
              name="storyPoints"
              defaultValue={form.storyPoints}
              error={hasError("storyPoints")}
              helperText={getHelperText("storyPoints")}
              placeholder="Enter title..."
              onChange={handleFieldChange("storyPoints")}
            />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <TextField
            label="Est. days"
            name="estimateDays"
            placeholder="Enter title..."
            value={form.estimateDays}
            error={hasError("estimateDays")}
            helperText={getHelperText("estimateDays")}
            onChange={handleFieldChange("estimateDays")}
          />
        </div>
        <div className="flex flex-col gap-2"></div>
      </div>
    </div>
  );
};

export default TaskFormInputs;
