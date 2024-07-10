import { Button } from "@/components/Button";
import { FC } from "react";

type Props = {
  onClick: () => void;
};
const CreateTaskButton: FC<Props> = ({ onClick }) => {
  return (
    <Button variant="outline" onClick={onClick} className="w-full">
      Create task
    </Button>
  );
};

export default CreateTaskButton;
