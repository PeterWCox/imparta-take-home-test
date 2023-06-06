import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TokenDetails } from '../../models/User'
import { TokenRepository_Cookie } from '../../repositories/TokenRepository'

export interface AuthSlice {
    token: string | null
}

const initialState: AuthSlice = {
    token: null,
}

const tokenRepository = new TokenRepository_Cookie()

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<TokenDetails>) => {
            state.token = action.payload.token
            tokenRepository.setToken(action.payload)
        },

        logout: (state) => {
            state.token = null
            tokenRepository.deleteToken()
        },
    },
})

export const { setToken, logout } = authSlice.actions

export default authSlice.reducer
