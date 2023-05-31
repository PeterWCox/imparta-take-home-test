import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { LoginRequest, RegistrationRequest, User } from '../../models/User'

export interface AuthSlice {
    user: User | null | undefined
    token: string | null | undefined
}

const initialState: AuthSlice = {
    user: null,
    token: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loadUser: () => {},
        login: (state, action: PayloadAction<LoginRequest>) => {},
        register: (state, action: PayloadAction<RegistrationRequest>) => {},
        logout: (state) => {
            state.user = null
        },
    },
})

export const { login, register, logout } = authSlice.actions

export default authSlice.reducer
