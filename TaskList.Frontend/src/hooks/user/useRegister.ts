import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../redux/hooks'
import { setToken } from '../../redux/slices/authSlice'
import { Constants } from '../../utils/Constants'

export interface RegisterRequest {
    username: string
    email: string
    password: string
}

const useRegister = (request: RegisterRequest | null) => {
    //Redux
    const dispatch = useAppDispatch()

    //Routing
    const navigate = useNavigate()

    //Mutations
    const { mutateAsync: register, error } = useMutation([request], {
        mutationFn: async () => {
            try {
                const response = await axios.post(
                    `${Constants.BASE_URL}Authentication/Register`,
                    request
                )

                //Set token if successful
                if (response.data?.token) {
                    dispatch(setToken(response.data.token))
                    navigate(0)
                }
            } catch (error) {
                throw new Error('An unknown error has occured')
            }
        },
    })

    return [register, error] as const
}

export default useRegister
