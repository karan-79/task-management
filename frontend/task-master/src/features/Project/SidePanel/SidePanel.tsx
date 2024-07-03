import Typography from "@/components/Typography";
import {FC, useState} from "react";
import {PanelSections} from "@/features/Project/types.ts";


type Props = {
    selectedView: PanelSections
    onChangeSelectedView: (selected: PanelSections) => void
    projectId: string
}
const SidePanel: FC<Props> = ({projectId, selectedView , onChangeSelectedView}) => {

    const defaultClasses = "block p-2 hover:bg-gray-200 rounded"
    const selectedClasses = "block p-2 bg-gray-200 rounded"

    const handleClick = (selected: PanelSections) => () => {
        onChangeSelectedView(selected)
    }

    return <div className="w-full lg:w-64 bg-gray-100 min-h-screen p-4">
        <div className="text-xl font-bold mb-4">My Project</div>
        <nav className="space-y-2">
            <Typography variant="p"
                       onClick={handleClick("Issues")}
                        className={selectedView=== "Issues" ? selectedClasses : defaultClasses}>Issues</Typography>
            <Typography variant="p"
                        onClick={handleClick("Board")}
                        className={selectedView === "Board" ? selectedClasses : defaultClasses}>Board</Typography>
        </nav>
    </div>
}

export default SidePanel