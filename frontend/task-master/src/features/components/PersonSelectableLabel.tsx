import { Avatar, AvatarFallback } from "@/components/Avatar/Avatar";
import Typography from "@/components/Typography";
import PersonAvatarLabel from "./PersonAvatarLabel";
import { Person } from "../Project/types";
import { FC } from "react";

type Props = {
  onSelect: () => void;
  person: Person;
};

const PersonSelectableLabel: FC<Props> = ({ person, onSelect }) => {
  return (
    <div
      className="p-2 border-b hover:bg-muted/50 flex items-center gap-4 cursor-pointer"
      onClick={onSelect}
    >
      <PersonAvatarLabel person={person} />
    </div>
  );
};

export default PersonSelectableLabel;
