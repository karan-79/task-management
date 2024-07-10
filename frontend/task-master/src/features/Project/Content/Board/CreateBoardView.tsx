import Typography from "@/components/Typography";
import { Button } from "@/components/Button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/Sheet";
import { ChangeEvent, FC, useState } from "react";
import { Label } from "@/components/Label";
import { Input } from "@/components/Input";
import { CreateBoardRequest } from "@/service/types.ts";
import { Textarea } from "@/components/TextArea";
import { createBoard } from "@/service/boardService.ts";
import board from "@/features/Project/Content/Board/Board.tsx";
import { UUID } from "@/types/generalTypes.ts";

const intialState = {
  name: "",
  description: "",
};

type Props = {
  projectId: UUID;
  onCreateBoard: () => void;
};

const CreateBoardView: FC<Props> = ({ projectId, onCreateBoard }) => {
  const [open, setOpen] = useState(false);

  const [boardForm, setBoardForm] = useState<CreateBoardRequest>(intialState);
  const [error, setError] = useState(false);

  const handleFieldChange =
    (field: keyof CreateBoardRequest) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setBoardForm((prev) => ({ ...prev, [field]: e.target.value }));

  console.log(boardForm);
  const handleCloseSheet = () => {
    setError(false);
    setBoardForm(intialState);
    setOpen(false);
  };
  const handleCreateBoard = () => {
    if (boardForm.name === "") return setError(true);
    createBoard(boardForm, projectId).then(() => {
      onCreateBoard();
      setOpen(false);
      setBoardForm(intialState);
    });
  };

  return (
    <div className="p-16 flex w-full">
      <Typography variant="h2">No boards exists</Typography>
      <Button className="ml-auto" onClick={() => setOpen(true)}>
        Create board
      </Button>

      {open && (
        <Sheet open={true} onOpenChange={handleCloseSheet}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Create new board</SheetTitle>
              <SheetDescription>Make a board for your project</SheetDescription>
            </SheetHeader>

            <div className="flex flex-col p-4 gap-4">
              <div className="flex-col items-center">
                <Label
                  htmlfor="name"
                  classname={error ? "text-destructive" : ""}
                >
                  Name
                </Label>
                <Input name="name" onChange={handleFieldChange("name")} />
                {error && (
                  <p className="text-destructive">Name can't be empty</p>
                )}
              </div>
              <div className="flex-col items-center">
                <Label htmlFor="description" className="text-left">
                  Description
                </Label>
                <Textarea
                  name="description"
                  onChange={handleFieldChange("description")}
                />
              </div>
              <SheetFooter>
                <Button className="w-full" onClick={handleCreateBoard}>
                  Create
                </Button>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default CreateBoardView;
