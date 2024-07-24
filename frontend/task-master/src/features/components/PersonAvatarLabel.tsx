import Typography from "@/components/Typography";
import { getInitials } from "../Project/Content/TasksTable/utils.tsx";
import { Person } from "../Project/types";
import { Avatar, AvatarFallback } from "@/components/Avatar/Avatar";
import { FC } from "react";
import { cn } from "@/utils";

type Props = {
  person: Person;
  className?: string;
};

const PersonAvatarLabel: FC<Props> = ({ person, className }) => {
  return (
    <div className={cn("flex gap-2 items-center", className)}>
      <Avatar>
        <AvatarFallback>{getInitials(person)}</AvatarFallback>
      </Avatar>
      <Typography variant="h6">{person.name}</Typography>
    </div>
  );
};

export default PersonAvatarLabel;
