export interface TaskList {
    id: number
    title: string
    isDone: boolean
    color: string
}

export type PartialTaskList = Partial<TaskList>
