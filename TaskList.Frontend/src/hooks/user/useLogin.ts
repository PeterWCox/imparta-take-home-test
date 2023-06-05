import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
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
    const {
        mutateAsync: signin,
        error,
        isLoading,
    } = useMutation(['signin'], {
        mutationFn: async () => {
            try {
                //Add a 5s delay to simulate a real API call
                await new Promise((resolve) => setTimeout(resolve, 5000))

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
                const errorTS = error as any
                const errorMessage: any = errorTS.response?.data.message

                if (errorMessage) {
                    throw new Error(errorMessage)
                }

                throw new Error(
                    'An unknown issue has occured. Please try again later.'
                )
            }
        },
    })

    return [signin, error, isLoading] as const
}

export default useSignin
