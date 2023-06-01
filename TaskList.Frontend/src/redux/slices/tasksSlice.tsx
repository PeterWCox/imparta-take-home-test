import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Task } from '../../models/Task'
import { LoginRequest, User } from '../../models/User'
import { AuthenticationRepositoryApi } from '../../repositories/AuthenticationRepository'
import { TaskRepositoryApi } from '../../repositories/TaskRepository'
import { TokenRepository_Cookie } from '../../repositories/TokenRepository'

export interface TasksState {
    tasks: Task[]
    user: User | null | undefined
    error: string | null
    isLoading: boolean
}

const initialState: TasksState = {
    tasks: [] as Task[],
    user: null,
    isLoading: false,
    error: null,
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        //Loading
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        //Authentication
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
        },
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks = [...state.tasks, action.payload]
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            state.tasks = state.tasks.map((t) =>
                t.id === action.payload.id ? action.payload : t
            )
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter((t) => t.id !== action.payload)
        },
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload
        },
    },
})

export const {
    setLoading,
    setUser,
    setError,
    setTasks,
    addTask,
    updateTask,
    deleteTask,
} = tasksSlice.actions
export default tasksSlice.reducer

export const thunkGetTasks = () => async (dispatch: any) => {
    //Set loading to true
    dispatch(setLoading(true))

    const repo = new TaskRepositoryApi(
        'http://localhost:24288/api/',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiUGV0ZXJDb3giLCJqdGkiOiIwNjg0OWY0Ny0xOTA4LTQzMzItYTRkNS1jNjljMzUxNjg3ZDciLCJleHAiOjE2ODU2MDA4NjgsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MjQyODgiLCJhdWQiOiJodHRwOiAvL2xvY2FsaG9zdDo0MjAwIn0.WjJXKJ-dYJ2zW5uNCIo5oiDO-pWSIQTMsQpvUPNr25s'
    )

    //Get tasks from API
    const tasks = await repo.getTasks()
    dispatch(setTasks(tasks))

    //Set loading to false
    setLoading(false)
}

export function thunkGetLogin() {
    return async (dispatch: any) => {
        //Set loading to true
        dispatch(setLoading(true))

        const token = new TokenRepository_Cookie().getToken()
        if (token) {
            setUser({
                id: 1,
                name: 'Peter Cox',
                email: 'p.cox@outlook.com',
                token: token,
            })
        }

        //Set loading to false
        setLoading(false)
    }
}

export function thunkAddTask(title: string) {
    return async (dispatch: any) => {
        //Set loading to true
        dispatch(setLoading(true))

        const repo = new TaskRepositoryApi(
            'http://localhost:24288/api/',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiUGV0ZXJDb3giLCJqdGkiOiIwNjg0OWY0Ny0xOTA4LTQzMzItYTRkNS1jNjljMzUxNjg3ZDciLCJleHAiOjE2ODU2MDA4NjgsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MjQyODgiLCJhdWQiOiJodHRwOiAvL2xvY2FsaG9zdDo0MjAwIn0.WjJXKJ-dYJ2zW5uNCIo5oiDO-pWSIQTMsQpvUPNr25s'
        )

        //Add new task
        const newTask: Task = await repo.addTask(title)
        dispatch(addTask(newTask))

        //Set loading to false
        setLoading(false)
    }
}

export function thunkUpdateTask(id: number, task: Task) {
    return async (dispatch: any) => {
        //Set loading to true
        dispatch(setLoading(true))

        const repo = new TaskRepositoryApi(
            'http://localhost:24288/api/',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiUGV0ZXJDb3giLCJqdGkiOiIwNjg0OWY0Ny0xOTA4LTQzMzItYTRkNS1jNjljMzUxNjg3ZDciLCJleHAiOjE2ODU2MDA4NjgsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MjQyODgiLCJhdWQiOiJodHRwOiAvL2xvY2FsaG9zdDo0MjAwIn0.WjJXKJ-dYJ2zW5uNCIo5oiDO-pWSIQTMsQpvUPNr25s'
        )

        //Add new task
        await repo.updateTask(id, task)
        dispatch(updateTask(task))

        //Set loading to false
        setLoading(false)
    }
}

export function thunkDeleteTask(id: number) {
    return async (dispatch: any) => {
        //Set loading to true
        dispatch(setLoading(true))

        const repo = new TaskRepositoryApi(
            'http://localhost:24288/api/',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiUGV0ZXJDb3giLCJqdGkiOiIwNjg0OWY0Ny0xOTA4LTQzMzItYTRkNS1jNjljMzUxNjg3ZDciLCJleHAiOjE2ODU2MDA4NjgsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MjQyODgiLCJhdWQiOiJodHRwOiAvL2xvY2FsaG9zdDo0MjAwIn0.WjJXKJ-dYJ2zW5uNCIo5oiDO-pWSIQTMsQpvUPNr25s'
        )

        //Add new task
        await repo.deleteTask(id)
        dispatch(deleteTask(id))

        //Set loading to false
        setLoading(false)
    }
}

export function thunkLogin(request: LoginRequest) {
    return async (dispatch: any) => {
        //Set loading to true
        dispatch(setLoading(true))

        const repo = new AuthenticationRepositoryApi(
            'http://localhost:24288/api/',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiUGV0ZXJDb3giLCJqdGkiOiIwNjg0OWY0Ny0xOTA4LTQzMzItYTRkNS1jNjljMzUxNjg3ZDciLCJleHAiOjE2ODU2MDA4NjgsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MjQyODgiLCJhdWQiOiJodHRwOiAvL2xvY2FsaG9zdDo0MjAwIn0.WjJXKJ-dYJ2zW5uNCIo5oiDO-pWSIQTMsQpvUPNr25s'
        )

        const response = await repo.login(request)
        console.log(response, 'response')

        if (response.token) {
            new TokenRepository_Cookie().setToken(response.token)
            dispatch(
                setUser({
                    id: 1,
                    name: 'Peter Cox',
                    email: '',
                    token: response.token,
                })
            )
        } else {
            dispatch(setError(response.error))
        }

        //Set loading to false
        setLoading(false)
    }
}
