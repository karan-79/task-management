import { RHFormFieldV2 } from "@/components/Input";
import { UseControllerProps } from "react-hook-form";
import { FC } from "react";
import { ControlProps } from "@/features/Home/CreateProject/Fields/types.ts";

const ProjectType: FC<ControlProps> = ({ control }) => {
  return (
    <div className="flex-col col-span-2 items-center">
      <RHFormFieldV2
        controllerProps={
          {
            control: control,
            name: "type",
            rules: {
              required: { value: true, message: "Cannot be empty" },
            },
          } as UseControllerProps
        }
        label="Type"
        placeholder="IT deparment..."
      />
    </div>
  );
};

export default ProjectType;
