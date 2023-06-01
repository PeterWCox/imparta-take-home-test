import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { LoginRequest, RegistrationRequest, User } from '../../models/User'
import { TokenRepository_Cookie } from '../../repositories/TokenRepository'

export interface AuthSlice {
    user: User | null | undefined
    token: string | null | undefined
    isLoading: boolean
}

const initialState: AuthSlice = {
    user: null,
    token: null,
    isLoading: false,
}

const tokenRepository = new TokenRepository_Cookie()

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        loadUser: () => {},
        login: (state, action: PayloadAction<LoginRequest>) => {},
        register: (state, action: PayloadAction<RegistrationRequest>) => {},
        logout: (state) => {
            state.user = null
        },
    },
})

export const { setLoading, login, register, logout, setToken } =
    authSlice.actions

export default authSlice.reducer

//Thunks
export const thunk_LoadUser = () => (dispatch: any) => {
    //Set loading to true
    dispatch(setLoading(true))

    //Try and get token from cookies
    const token = tokenRepository.getToken()
    if (!token) {
        dispatch(setLoading(false))
        return
    }

    dispatch(setToken(token))
    setLoading(false)
}
