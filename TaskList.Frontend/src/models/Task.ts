export interface Task {
    id: number
    title: string
    status: Status
    isDone: boolean
}

export type Status = 'Pending' | 'In progresss' | 'Completed'
