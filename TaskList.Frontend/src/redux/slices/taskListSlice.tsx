import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TaskList } from '../../models/TaskList'

export interface TaskListSlice {
    taskList: TaskList | null
}

const initialState: TaskListSlice = {
    taskList: null,
}

export const taskListSlice = createSlice({
    name: 'taskList',
    initialState,
    reducers: {
        setTasklist: (state, action: PayloadAction<TaskList | null>) => {
            state.taskList = action.payload
        },
    },
})

export const { setTasklist } = taskListSlice.actions

export default taskListSlice.reducer
