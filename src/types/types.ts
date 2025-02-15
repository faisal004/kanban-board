
export type Status = string
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
    comments?: Comment[];
}
export interface Comment {
    id: string;
    userId: string;
    userName: string;
    content: string;
    timestamp: string;
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
    updateTaskAfterDrag: (title: string, status: Status) => void,
    addComment: (taskId: string, comment: Comment) => void;


}

// export type Columns = {
//     title: string,
//     status: Status
// }
export type Column = {
    id: string,
    title: string,
    status: Status,
    color: string
}
export type ColumnsState = {
    columns: Column[],
    
}
export type ColumnActions = {
    
    addColumn: (title: string, color: string) => void,
    removeColumn: (id: string) => void,
    updateColumn: (id: string, updatedFields: Partial<Column>) => void
}
