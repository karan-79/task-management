import { FC } from "react";
import { ControlProps } from "@/features/Home/CreateProject/Fields/types.ts";
import { RHFormFieldV2 } from "@/components/Input";
import { UseControllerProps } from "react-hook-form";

const ProjectDescription: FC<ControlProps> = ({ control }) => {
  return (
    <div className="flex-col items-center">
      <RHFormFieldV2
        controllerProps={
          {
            control: control,
            name: "description",
          } as UseControllerProps
        }
        label="Description"
        placeholder="Add some description..."
      />
    </div>
  );
};

export default ProjectDescription;
