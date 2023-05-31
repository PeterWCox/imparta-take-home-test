import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Task } from '../../models/Task'

export interface TasksState {
    tasks: Task[]
}

const initialState: TasksState = {
    tasks: [
        {
            id: 1,
            title: 'Task 1',
            isDone: false,
            status: 'Completed',
        },
        {
            id: 2,
            title: 'Task 2',
            isDone: false,
            status: 'Completed',
        },
        {
            id: 3,
            title: 'Task 3',
            isDone: true,
            status: 'Completed',
        },
        {
            id: 4,
            title: 'Task 3',
            isDone: false,
            status: 'Pending',
        },
    ],
}

// const todoRepository: ITodoRepository = new TodoRepository_LocalStorage()
// const todoService: ITodoService = new TodoService(todoRepository)

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<string>) => {
            const newId = state.tasks.length + 1
            state.tasks = [
                ...state.tasks,
                {
                    id: newId,
                    title: action.payload,
                    isDone: false,
                    status: 'Pending',
                },
            ]
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            state.tasks = state.tasks.map((todo) =>
                todo.id === action.payload.id ? action.payload : todo
            )
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter(
                (todo) => todo.id !== action.payload
            )
        },
        // loadTodos: (state) => {
        //     state.todos = todoService.getTodos()
        // },
        // updateTodos: (state, action: PayloadAction<Todo[]>) => {
        //     todoService.updateTodos(action.payload)
        //     state.todos = TodoUtils.sortTodos(action.payload)
        // },
        // deleteAllTodos: (state) => {
        //     todoService.deleteAllTodos()
        //     state.todos = todoService.getTodos()
        // },
    },
})

export const {
    addTask,
    updateTask,
    deleteTask,
    // addSampleTodos,
    // updateTodo,
    // loadTodos,
    // updateTodos,
    // deleteAllTodos,
} = tasksSlice.actions

export default tasksSlice.reducer
