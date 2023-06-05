import { Status } from '../enums/Enums'

export interface Task {
    id: number
    title: string
    status: Status
    isDone: boolean
}

export type PartialTask = Partial<Task>
