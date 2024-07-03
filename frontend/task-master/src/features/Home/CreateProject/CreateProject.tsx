import { Button } from "@/components/Button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/Sheet";
import { Input } from "@/components/Input";
import { FC } from "react";
import { Label } from "@/components/Label";
import { Textarea } from "@/components/TextArea";

type Props = {
  open: boolean;
  onClose: () => void;
};

const CreateProject: FC<Props> = ({ open, onClose }) => {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="min-w-[600px]">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col p-4 gap-4">
          <div className="flex-col items-center">
            <Label htmlFor="name" className="mb-2 text-left">
              Name
            </Label>
            <Input id="name" className="col-span-2" />
          </div>
          <div className="flex-col items-center">
            <Label htmlFor="name" className="mb-2 text-left">
              Description
            </Label>
            <Textarea
              id="name"
              placeholder="write some..."
              className="col-span-2"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="flex-col items-center">
              <Label htmlFor="name" className="mb-2 text-left">
                Short name
              </Label>
              <Input
                id="name"
                placeholder="write some..."
                className="col-span-2"
              />
            </div>
            <div className="flex-col col-span-2 items-center">
              <Label htmlFor="name" className="mb-2 text-left">
                Type
              </Label>
              <Input
                id="name"
                placeholder="write some..."
                className="col-span-2"
              />
            </div>
          </div>
        </div>
        <SheetFooter>
          <Button onClick={onClose}>Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CreateProject;
