import Typography from "@/components/Typography";
import { FC, useState } from "react";
import { PanelSections } from "@/features/Project/types.ts";

type Props = {
  selectedView: PanelSections;
  onChangeSelectedView: (selected: PanelSections) => void;
  projectName: string;
};
const SidePanel: FC<Props> = ({
  selectedView,
  projectName,
  onChangeSelectedView,
}) => {
  const defaultClasses = "block p-2 rounded cursor-pointer hover:bg-muted";
  const selectedClasses =
    "block p-2 bg-background rounded cursor-pointer border-b-2";

  const handleClick = (selected: PanelSections) => () => {
    onChangeSelectedView(selected);
  };

  return (
    <div className="col-span-2 bg-muted/50 border-r p-4">
      <div className="bg-muted p-4 rounded-md">
        <div className="text-xl font-bold mb-4">
          <Typography variant="h4">{projectName}</Typography>
        </div>
        <nav className="space-y-2">
          <Typography
            variant="h5"
            onClick={handleClick("Issues")}
            className={
              selectedView === "Issues" ? selectedClasses : defaultClasses
            }
          >
            Issues
          </Typography>
          <Typography
            variant="h5"
            onClick={handleClick("Board")}
            className={
              selectedView === "Board" ? selectedClasses : defaultClasses
            }
          >
            Board
          </Typography>
        </nav>
      </div>
    </div>
  );
};

export default SidePanel;
