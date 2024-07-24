import { Board as TBoard, PanelSections } from "@/features/Project/types.ts";
import { FC } from "react";
import Board from "@/features/Project/Content/Board";
import { useFetchWithLoading } from "@/hooks/useFetchWithLoading.ts";
import CreateBoardView from "@/features/Project/Content/Board/CreateBoardView.tsx";
import { UUID } from "@/types/generalTypes.ts";
import { getRecentBoard } from "@/service/boardService.ts";
import Typography from "@/components/Typography";
import TaskTable from "@/features/Project/Content/TasksTable";
import { useEffectSkipFirstRender } from "@/hooks/useEffectSkipFirstRender.ts";

type Props = {
  view: PanelSections;
  projectId: UUID;
};
const Content: FC<Props> = ({ view, projectId }) => {
  const {
    isLoading,
    data: board,
    setData: setBoard,
    refresh,
  } = useFetchWithLoading<TBoard>({
    fetchFn: () => getRecentBoard(projectId),
    initialState: undefined,
  });

  useEffectSkipFirstRender(() => {
    if (view === "Board") {
      refresh();
    }
  }, [view]);

  if (view === "Board") {
    if (isLoading) return <Typography variant="p">Loading</Typography>;
    return (
      <div className="col-span-10 p-4 overflow-y-hidden">
        {board ? (
          <Board board={board} projectId={projectId} />
        ) : (
          <CreateBoardView projectId={projectId} onCreateBoard={refresh} />
        )}
      </div>
    );
  }

  return (
    <div className="col-span-10 p-4 overflow-y-hidden">
      <TaskTable projectId={projectId} />
    </div>
  );
};

export default Content;
