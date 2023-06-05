import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../redux/hooks'
import { setToken } from '../../redux/slices/authSlice'
import { Constants } from '../../utils/Constants'

export interface LoginRequest {
    email: string
    password: string
}

const useSignin = (request: LoginRequest) => {
    //Routing
    const navigate = useNavigate()

    //Redux
    const dispatch = useAppDispatch()

    //Mutations
    const { mutateAsync: signin, error } = useMutation(['signin'], {
        mutationFn: async () => {
            try {
                const response = await axios.post(
                    `${Constants.BASE_URL}Authentication/Login`,
                    request
                )

                //Set token if successful
                if (response.data?.token && response.data?.expiration) {
                    dispatch(
                        setToken({
                            token: response.data.token,
                            expiration: new Date(
                                response.data.expiration
                            ).toString(),
                        })
                    )
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
