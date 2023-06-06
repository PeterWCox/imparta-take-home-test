import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { RegistrationRequest } from '../../models/User'
import { useAppDispatch } from '../../redux/hooks'
import { setToken } from '../../redux/slices/authSlice'
import { Constants } from '../../utils/Constants'

export interface RegisterRequest {
    username: string
    email: string
    password: string
}

const useRegister = () => {
    //Redux
    const dispatch = useAppDispatch()

    //Routing
    const navigate = useNavigate()

    //Mutations
    const {
        mutateAsync: register,
        error,
        isLoading,
    } = useMutation([], {
        mutationFn: async (request: RegistrationRequest) => {
            try {
                const response = await axios.post(
                    Constants.ApiUrl(`Authentication/Register`),
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

    return [register, error, isLoading] as const
}

export default useRegister
