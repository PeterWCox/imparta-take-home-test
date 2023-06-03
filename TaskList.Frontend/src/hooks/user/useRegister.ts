import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../redux/hooks'
import { setToken } from '../../redux/slices/authSlice'

export interface RegisterRequest {
    username: string
    email: string
    password: string
}

const useRegister = (request: RegisterRequest | null) => {
    //Routing
    const navigate = useNavigate()

    //Redux
    const dispatch = useAppDispatch()

    //Mutations
    const { mutateAsync: register, error } = useMutation([request], {
        mutationFn: async () => {
            try {
                if (!request) throw new Error('Invalid request')

                const response = await axios.post(
                    `http://localhost:24288/api/Authentication/Register`,
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

    return [register, error] as const
}

export default useRegister