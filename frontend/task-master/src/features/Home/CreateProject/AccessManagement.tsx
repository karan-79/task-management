import { Button } from "@/components/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table";
import { FC, useEffect, useState } from "react";
import PersonSelect from "@/features/Home/CreateProject/PersonSelect.tsx";
import {
  addProjectMember,
  getProjectMembers,
} from "@/service/projectService.ts";
import { Person } from "@/features/Project/types.ts";
import { UUID } from "@/types/generalTypes.ts";
import { ScrollArea, ScrollBar } from "@/components/ScrollArea";

type Props = {
  projectId: UUID;
};
const AccessManagement: FC<Props> = ({ projectId }) => {
  const [projectMembers, setProjectMembers] = useState<Person[]>([]);

  useEffect(() => {
    getProjectMembers(projectId).then(setProjectMembers);
  }, []);

  const handleSelect = (person: Person) => {
    if (projectMembers.find((p) => p.id === person.id)) return;

    addProjectMember(person.id, projectId).then(() => {
      setProjectMembers((prev) => [...prev, person]);
    });
  };

  return (
    <div>
      <div className="mb-4 grid grid-cols-2">
        <PersonSelect onSelect={handleSelect} />
      </div>
      <ScrollArea className="rounded-md border">
        <div className="max-h-96">
          <Table>
            <TableHeader className="mx-auto">
              {/* <TableRow> */}
              <TableHead>Name</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Action</TableHead>
              {/* </TableRow> */}
            </TableHeader>
            <TableBody className="overflow-y-scroll">
              {projectMembers.map(({ name, email, id }) => {
                return (
                  <TableRow key={id}>
                    <TableCell>{name}</TableCell>
                    <TableCell>{email}</TableCell>
                    <TableCell>
                      <Button variant="destructive" className="m-0">
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
};

export default AccessManagement;
