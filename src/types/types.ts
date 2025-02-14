
export type Status = "TODO" | "IN_PROGRESS" | "DONE"
export type Priority = "HIGH" | "MEDIUM" | "LOW"
export type Assignee={
    id:string,
    name:string,
    avatar?:string
}
export type Task = {
    id: string,
    title: string,
    description: string,
    status: Status,
    priority: Priority,
    assignee: Assignee,
    dueDate: string;
}

export type State = {
    tasks: Task[],
    draggedTask: string | null
}

export type Actions = {
    addTask: (title: string, description: string, status: Status, priority: Priority, assignee:Assignee,dueDate:string) => void
    dragTask: (id: string | null) => void
    removeTask: (title: string) => void
    updateTask: (id:string,updatedFields: Partial<Task>) => void,
    updateTaskAfterDrag: (title: string, status: Status) => void

}

export type Columns = {
    title: string,
    status: Status
}