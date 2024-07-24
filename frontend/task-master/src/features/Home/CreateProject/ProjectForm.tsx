import { useForm } from "react-hook-form";
import { SheetFooter } from "@/components/Sheet";
import { Button } from "@/components/Button";
import { ProjectRequest } from "@/service/types.ts";
import { FC, forwardRef, useEffect, useImperativeHandle } from "react";
import { Project } from "@/features/Project/types.ts";
import { createProject } from "@/service/projectService.ts";
import ProjectName from "@/features/Home/CreateProject/Fields/ProjectName.tsx";
import ProjectDescription from "@/features/Home/CreateProject/Fields/ProjectDescription.tsx";
import ShortName from "@/features/Home/CreateProject/Fields/ShortName.tsx";
import ProjectType from "@/features/Home/CreateProject/Fields/ProjectType.tsx";

type Props = {
  initialValues: ProjectRequest;
  isOpenForUpdate?: boolean;
  onSubmit: (data: ProjectRequest) => void;
};

const ProjectForm: FC<Props> = ({
  onSubmit,
  isOpenForUpdate,
  initialValues,
}) => {
  const { control, reset, getValues, watch, setValue, handleSubmit } =
    useForm<ProjectRequest>({
      defaultValues: initialValues,
    });

  useEffect(() => {
    const subscription = watch((value, info) => {
      if (
        info.name === "shortName" &&
        value.shortName &&
        (/[a-z]+/.test(value.shortName) || /\s+/.test(value.shortName)) &&
        !/[0-9]+/.test(value.shortName)
      ) {
        setValue(
          "shortName" as any,
          value.shortName.replace(/\s+/, "").toUpperCase(),
        );
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleValidForm = (data: ProjectRequest) => {
    onSubmit(data);
  };

  console.log("vales", getValues());

  return (
    <form onSubmit={handleSubmit(handleValidForm)}>
      <div className="flex flex-col mt-4 gap-4">
        <ProjectName control={control} />
        <ProjectDescription control={control} />
        <div className="grid grid-cols-3 gap-2">
          <ShortName control={control} disabled={isOpenForUpdate} />
          <ProjectType control={control} />
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
        </SheetFooter>
      </div>
    </form>
  );
};

export default ProjectForm;
