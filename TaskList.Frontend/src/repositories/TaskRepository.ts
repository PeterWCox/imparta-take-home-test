import { Task } from '../models/Task'
import { ApiRepository } from './base/ApiRepositoryBase'

export interface ITaskRepository {
    getTasks(): Promise<Task[]>
    addTask(task: Task): Promise<void>
    updateTask(task: Task): Promise<void>
    deleteTask(task: Task): Promise<void>
}

export class TaskRepository
    extends ApiRepository<Task>
    implements ITaskRepository
{
    constructor(baseUrl: string, token: string) {
        super(baseUrl, token)
    }

    public getTasks = async (): Promise<Task[]> => {
        return await this.get('api/tasks')
    }

    public addTask = async (task: Task): Promise<void> => {
        await this.add('api/todoitem', task)
    }

    public updateTask = async (task: Task): Promise<void> => {
        await this.put('api/todoitem', task)
    }

    public deleteTask = async (id: Task): Promise<void> => {
        await this.delete(`api/todoitem/${id}`)
    }
}
