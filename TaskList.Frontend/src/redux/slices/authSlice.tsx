import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '../../models/User'
import { TokenRepository_Cookie } from '../../repositories/TokenRepository'

export interface AuthSlice {
    user: User | null
    token: string | null
    isLoading: boolean
}

const initialState: AuthSlice = {
    user: null,
    token: null,
    isLoading: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        //Loading
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
            new TokenRepository_Cookie().setToken(action.payload)
        },
        setUser: (state, action: PayloadAction<User>) => {
            console.log(action.payload)
            state.user = action.payload
        },
        logout: (state) => {
            state.token = null
            state.user = null
            new TokenRepository_Cookie().deleteToken()
        },
    },
})

export const { setLoading, setToken, setUser, logout } = authSlice.actions

export default authSlice.reducer
