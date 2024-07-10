import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Check, X } from "lucide-react";
import { FC, useState } from "react";

type Props = {
  onClose: (columnName?: string) => void;
};
const CreateColumn: FC<Props> = ({ onClose }) => {
  const [name, setName] = useState("");

  return (
    <div className="flex flex-col gap-2">
      <Input
        name="columnName"
        defaultValue=""
        autoFocus
        onChange={(e) => setName(e.target.value.trim().toUpperCase())}
      />
      <div className="flex justify-end gap-2">
        <Button variant="destructive" size="icon" onClick={() => onClose()}>
          <X />
        </Button>
        <Button size="icon" onClick={() => onClose(name)}>
          <Check />
        </Button>
      </div>
    </div>
  );
};

export default CreateColumn;
