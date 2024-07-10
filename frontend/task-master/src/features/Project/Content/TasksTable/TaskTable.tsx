import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table";
import { Avatar, AvatarFallback } from "@/components/Avatar/Avatar.tsx";
import { getInitials } from "@/features/Project/Content/TasksTable/utils.ts";
import { Task } from "@/features/Project/types.ts";

const mockTasks: Task[] = [
  {
    id: "PL-1",
    title: "Implement login functionality",
    assignee: { id: "1", name: "John Doe", email: "john.doe@example.com" },
    status: "Todo",
    type: "story",
    priority: "LOW",
    storyPoints: "5",
    sortIndex: 1,
    estimateDays: 3,
    estimateMins: 180,
  },
  {
    id: "PL-2",
    title: "Fix dashboard layout issues",
    assignee: { id: "2", name: "Jane Smith", email: "jane.smith@example.com" },
    status: "In Progress",
    type: "bug",
    priority: "HIGH",
    sortIndex: 2,
    estimateDays: 1,
    estimateMins: 60,
  },
  {
    id: "PL-3",
    title: "Implement search functionality",
    assignee: {
      id: "3",
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
    },
    status: "Todo",
    priority: "URGENT",
    type: "story",
    storyPoints: "8",
    sortIndex: 3,
    estimateDays: 5,
    estimateMins: 300,
  },
  {
    id: "PL-4",
    title: "Redesign user profile page",
    assignee: {
      id: "4",
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
    },
    status: "Done",
    type: "epic",
    priority: "HIGH",
    storyPoints: "13",
    sortIndex: 4,
    estimateDays: 10,
    estimateMins: 600,
  },
  {
    id: "PL-5",
    title: "Optimize database queries",
    assignee: {
      id: "5",
      name: "David Brown",
      email: "david.brown@example.com",
    },
    status: "In Progress",
    type: "bug",
    priority: "HIGH",
    sortIndex: 5,
    estimateDays: 2,
    estimateMins: 120,
  },
];

const TaskTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableHead>Id</TableHead>
        <TableHead>Assignee</TableHead>
        <TableHead>Title</TableHead>
        <TableHead>Type</TableHead>
        <TableHead>Priority</TableHead>
      </TableHeader>
      <TableBody>
        {mockTasks.map((task) => {
          return (
            <TableRow>
              <TableCell>{task.id}</TableCell>
              <TableCell>
                <div className="flex gap-2 items-center">
                  <Avatar>
                    <AvatarFallback>
                      {getInitials(task.assignee)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.type}</TableCell>
              <TableCell>{task.priority}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TaskTable;
