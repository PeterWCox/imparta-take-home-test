import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../redux/hooks'
import { setToken } from '../../redux/slices/authSlice'

export interface SigninRequest {
    username: string
    password: string
}

const useSignin = (request: SigninRequest) => {
    //Routing
    const navigate = useNavigate()

    //Redux
    const dispatch = useAppDispatch()

    //Mutations
    const { mutateAsync: signin, error } = useMutation([request], {
        mutationFn: async () => {
            try {
                const response = await axios.post(
                    `http://localhost:24288/api/Authentication/Login`,
                    request
                )

                //Set token if successful
                if (response.data?.token) {
                    dispatch(setToken(response.data.token))
                    navigate(0)
                }
            } catch (error) {
                const errors = error as AxiosError

                if (errors?.response?.status === 401) {
                    throw new Error('Invalid username or password')
                }

                throw new Error('An unknown error has occured')
            }
        },
    })

    return [signin, error] as const
}

export default useSignin
