import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select";
import { ChevronsDown } from "lucide-react";
import Typography from "@/components/Typography";
import { BoardIdentity } from "@/features/Project/types.ts";
import { FC, useEffect, useState } from "react";
import { getAllBoardsForProject } from "@/service/boardService.ts";
import { UUID } from "@/types/generalTypes.ts";
import { useProject } from "@/features/Project/ProjectProvider/ProjectProvider.tsx";

type Props = {
  boardId?: number;
};

const BoardSelect: FC<Props> = ({ boardId }) => {
  const { projectId } = useProject();
  const [boards, setBoards] = useState<BoardIdentity[]>([]);
  const [selected, setSelected] = useState<BoardIdentity>(null);

  useEffect(() => {
    getAllBoardsForProject(projectId).then((boards) => {
      setBoards(boards);
      if (boardId) {
        setSelected(boards.find((b) => b.id == boardId));
      }
    });
  }, []);

  const handleSelect = (id) => {
    setSelected(boards.find((b) => b.id == id));
  };
  console.log(selected);
  return (
    <Select
      value={selected ? selected.id + "" : undefined}
      onValueChange={handleSelect}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select board" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {boards.map((board) => (
            <SelectItem value={String(board.id)}>
              <Typography variant="h6">{board.name}</Typography>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default BoardSelect;
