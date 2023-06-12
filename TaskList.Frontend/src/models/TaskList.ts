export interface TaskList {
    id: number
    title: string
    isDone: boolean
}

export type PartialTask = Partial<TaskList>
