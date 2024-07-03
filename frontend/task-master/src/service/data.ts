import {Board, Project, Task} from "@/features/Project/types.ts";

export const projectsOverview : Project[] = [
    {
        id: "p1",
        name: "Project 1",
        description: "This is the description of project 1"
    },
    {
        id: "p2",
        name: "Project 2",
        description: "This is the description of project 2"
    },
    {
        id: "p3",
        name: "Project 3",
        description: "This is the description of project 3"
    },
    {
        id: "p4",
        name: "Project 4",
        description: "This is the description of project 4"
    },
    {
        id: "p5",
        name: "Project 5",
        description: "This is the description of project 5"
    },
    {
        id: "p6",
        name: "Project 6",
        description: "This is the description of project 6"
    },
    {
        id: "p7",
        name: "Project 7",
        description: "This is the description of project 7"
    },
]


export const mockTasks : Task[] =  [
    {
        id: "TM-1",
        title: "Set up project structure",
        status: "TO DO",
        type: "story",
        storyPoints: "3",
        sortOrder: 1,
        estimateDays: 2
    },
    {
        id: "TM-322",
        title: "Create login functionality",
        status: "IN PROGRESS",
        type: "task",
        storyPoints: "5",
        sortOrder: 6,
        estimateDays: 3
    },
    {
        id: "TM-2323",
        title: "Fix login bugs",
        status: "TO DO",
        type: "bug",
        sortOrder: 3,
        estimateMins: 120
    },
    {
        id: "TM-2304",
        title: "Design home page",
        status: "DONE",
        type: "epic",
        sortOrder: 1,
        storyPoints: "8",
        estimateDays: 4
    },
    {
        id: "TM-2325",
        title: "Set up CI/CD pipeline",
        status: "IN PROGRESS",
        type: "task",
        sortOrder: 4,
        storyPoints: "3",
        estimateDays: 2
    },
    {
        id: "TM-1316",
        title: "Create API documentation",
        status: "DONE",
        sortOrder: 5,
        type: "story",
        estimateMins: 180
    }
]

export const mockBoard: Board = {
    name: "KAN Board",
    description: "A sample board to manage tasks",

    columns: [
        {
            name: "TO DO",
            sortIndex: 1
        },
        {
            name: "IN PROGRESS",
            sortIndex: 2
        },
        {
            name: "DONE",
            sortIndex: 3
        }
    ]
};