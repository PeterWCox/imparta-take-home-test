export interface Task {
    id: number
    title: string
    status: Status
    isDone: boolean
}

export type PartialTask = Partial<Task>

export type Status = 'Pending' | 'In progresss' | 'Completed'
