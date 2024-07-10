import { UseControllerProps } from "react-hook-form";
import { RHFormFieldV2 } from "@/components/Input";
import { FC } from "react";
import { ControlProps } from "@/features/Home/CreateProject/Fields/types.ts";

const ProjectName: FC<ControlProps> = ({ control }) => {
  return (
    <div className="flex-col items-center">
      <RHFormFieldV2
        controllerProps={
          {
            control: control,
            name: "name",
            rules: {
              required: {
                value: true,
                message: "Name must be given",
              },
            },
          } as UseControllerProps
        }
        label="Project name"
        placeholder="Enter project name"
      />
    </div>
  );
};

export default ProjectName;
