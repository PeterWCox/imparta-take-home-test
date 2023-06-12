import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TaskList } from '../../models/TaskList'

export interface TaskListSlice {
    selectedTaskList: TaskList | null
}

const initialState: TaskListSlice = {
    selectedTaskList: null,
}

export const taskListSlice = createSlice({
    name: 'taskList',
    initialState,
    reducers: {
        setTasklist: (state, action: PayloadAction<TaskList | null>) => {
            state.selectedTaskList = action.payload
        },
    },
})

export const { setTasklist } = taskListSlice.actions

export default taskListSlice.reducer
