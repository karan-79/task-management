import { FC } from "react";
import { ControlProps } from "@/features/Home/CreateProject/Fields/types.ts";
import { RHFormFieldV2 } from "@/components/Input";
import { UseControllerProps } from "react-hook-form";

const ShortName: FC<ControlProps> = ({ control }) => {
  return (
    <div className="flex-col items-center">
      <RHFormFieldV2
        controllerProps={
          {
            control: control,
            name: "shortName",
            rules: {
              required: {
                value: true,
                message: "Short name is required",
              },
              maxLength: {
                value: 8,
                message: "Cannot be more than 8 characters",
              },
            },
          } as UseControllerProps
        }
        label="Short name"
        placeholder="Add short name.."
      />
    </div>
  );
};

export default ShortName;
