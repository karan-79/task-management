import Typography from "@/components/Typography";
import {PanelSections} from "@/features/Project/types.ts";
import {FC} from "react";
import Board from "@/features/Project/Content/Board";
import {mockBoard} from "@/service/data.ts";

type Props = {
    view: PanelSections
}
const Content: FC<Props> = ({view}) => {

    return <>
        {
            view === "Board" ? <Board board={mockBoard}/> : <>Issues section</>
        }
    </>
}

export default Content