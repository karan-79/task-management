export type Project = {
    id: string
    name: string
    description: string
    totalIssues?: number
    totalBoards?: number
    // TODO can maybe add links
}

export type PanelSections = "Board" | "Issues"

export type Column = {
    name: string
    sortIndex: number
}

//Task shown in board
export type Task = {
    id: string
    title: string
    status: string // which column it belongs to
    type: string // task type bug | story | epic etc
    storyPoints?: string
    sortOrder?: number
    estimateDays?: number
    estimateMins?: number
}


export type Board = {
    name: string
    description: string
    columns: Column[]
}