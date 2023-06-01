export interface Task {
    id: number
    title: string
    status: Status
    isDone: boolean
}

export enum Status {
    Pending = 0,
    InProgress = 1,
    Completed = 2,
}
