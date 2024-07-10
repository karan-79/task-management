import { Button } from "@/components/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table";
import { useState } from "react";

const AccessManagement = () => {
  const [projectMembers, setProjectMembers] = useState([]);

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="mx-auto">
            {/* <TableRow> */}
            <TableHead>Name</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Action</TableHead>
            {/* </TableRow> */}
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>mr toool</TableCell>
              <TableCell>test@test.com</TableCell>
              <TableCell>
                <Button variant="destructive" className="m-0">
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AccessManagement;
