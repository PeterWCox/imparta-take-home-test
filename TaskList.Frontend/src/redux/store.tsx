import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import authReducer from './slices/authSlice'
import taskListReducer from './slices/taskListSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    taskList: taskListReducer,
})

export const store = configureStore({
    reducer: rootReducer,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
