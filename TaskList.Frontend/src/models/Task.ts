import { Status } from '../enums/Enums'
import { SubTask } from './SubTask'

export interface Task {
    id: number
    title: string
    status: Status
    isDone: boolean
    isMyDay: boolean
    isImportant: boolean
    dueDate: Date | null
    notes: string | null
    subTasks: SubTask[]
}

export type PartialTask = Partial<Task>
