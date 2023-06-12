export interface SubTask {
    id: number
    title: string
    isDone: boolean
}

export type PartialTask = Partial<SubTask>
