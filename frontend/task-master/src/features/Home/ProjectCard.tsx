import { Button } from "@/components/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import Typography from "@/components/Typography";
import { Project } from "@/features/Project/types.ts";
import { Settings } from "lucide-react";
import { FC, SyntheticEvent } from "react";

type Props = {
  project: Project;
  onClick: () => void;
  onEdit: () => void;
};

const ProjectCard: FC<Props> = ({ project, onClick, onEdit }) => {
  const handleEdit = (e: SyntheticEvent) => {
    e.stopPropagation();
    onEdit();
  };
  return (
    <Card
      className="transition-transform transform  cursor-pointer hover:scale-105 hover:shadow-lg"
      onClick={onClick}
    >
      <CardHeader className="flex items-center flex-row">
        <div className="flex-grow">
          <CardTitle>{project.name}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </div>
        <Button variant="ghost" onClick={handleEdit}>
          <Settings />
        </Button>
      </CardHeader>
      <CardContent>
        <Typography variant="p">
          {"Issues " + (project.totalIssues ?? 0)}
        </Typography>
        <Typography variant="p">
          {"Boards " + (project.totalBoards ?? 0)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
