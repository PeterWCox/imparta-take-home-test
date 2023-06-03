import { Task } from '../models/Task'
import { ApiRepository } from './base/ApiRepositoryBase'

export interface ITasksRepository {
    getTasks(): Promise<Task[]>
    addTask(title: string): Promise<Task>
    updateTask(id: number, task: Task): Promise<void>
    deleteTask(id: number): Promise<void>
}

export class TasksRepositoryApi
    extends ApiRepository<Task>
    implements ITasksRepository
{
    constructor(token: string) {
        super(token)
    }

    public getTasks = async (): Promise<Task[]> => {
        return await this.get('tasks')
    }

    public addTask = async (title: string): Promise<Task> => {
        return await this.add('tasks', {
            title,
        })
    }

    public updateTask = async (id: number, task: Task): Promise<void> => {
        await this.update(`tasks/${id}`, task)
    }

    public deleteTask = async (id: number): Promise<void> => {
        await this.delete(`tasks/${id}`)
    }
}