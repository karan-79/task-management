import Typography from "@/components/Typography";
import { Button } from "@/components/Button";
import { FC } from "react";

type Props = {
  onCreateProject: () => void;
};

const ProjectHeader: FC<Props> = ({ onCreateProject }) => {
  return (
    <div className="flex">
      <Typography variant="h2">Your work</Typography>
      <Button className="ml-auto min-w-52" onClick={onCreateProject}>
        Create project
      </Button>
    </div>
  );
};

export default ProjectHeader;
