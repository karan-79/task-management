import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/Card";
import Typography from "@/components/Typography";
import {Project} from "@/features/Project/types.ts";
import {FC} from "react";

type Props = {
    project : Project
    onClick: () => void
}

const ProjectCard : FC<Props> = ({project , onClick}) => {
   return <Card className="transition-transform transform hover:scale-105 hover:shadow-lg" onClick={onClick}>
        <CardHeader>
            <CardTitle>
                {project.name}
            </CardTitle>
            <CardDescription>
                {project.description}
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Typography variant="p">
                { "Issues " + (project.totalIssues ?? 0)}
            </Typography>
            <Typography variant="p">
                { "Boards " + (project.totalBoards ?? 0)}
            </Typography>
        </CardContent>
    </Card>
}

export default ProjectCard