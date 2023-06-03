export interface Task {
    id: number
    title: string
    status: Status
    isDone: boolean
}

export type PartialTask = Partial<Task>

export enum Status {
    Pending = 0,
    InProgress = 1,
    Completed = 2,
}
