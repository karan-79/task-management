import * as React from "react";

import { cn } from "@/utils";
import { FC } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import Typography from "@/components/Typography";
import { Label } from "@/components/Label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

type Props<T> = {
  controllerProps: UseControllerProps<T>;
  inputProps: InputProps;
  label: string;
};

const RHFormField = <T,>({ label, controllerProps, inputProps }: Props<T>) => {
  const { field, fieldState } = useController(controllerProps);
  return (
    <>
      <Label
        htmlFor={field.name}
        className={fieldState.error ? "text-destructive" : ""}
      >
        {label}
      </Label>
      <input
        {...field}
        placeholder={controllerProps.name}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          inputProps.className,
        )}
      />
      {fieldState.error && (
        <p className="text-destructive">{fieldState.error.message}</p>
      )}
    </>
  );
};

export { Input, RHFormField };
