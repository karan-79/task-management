import { Label } from "@/components/Label";
import { Input, InputProps } from "@/components/Input";
import { FC } from "react";
import Typography from "@/components/Typography";

type Props = {
  label: string;
  error?: boolean;
  helperText?: string;
} & InputProps;

const TextField: FC<Props> = ({ label, error, helperText, ...props }) => {
  return (
    <>
      <Label htmlFor={props.name} className={error ? "text-destructive" : ""}>
        {label}
      </Label>
      <Input {...props} />
      {error && helperText && (
        <Typography variant={p} className="text-destructive">
          {helperText}
        </Typography>
      )}
    </>
  );
};

export { TextField };
