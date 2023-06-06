import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setUser } from '../../redux/slices/authSlice'
import { RootState } from '../../redux/store'
import { Constants } from '../../utils/Constants'

const useUser = () => {
    //Redux
    const dispatch = useAppDispatch()
    const { token } = useAppSelector((state: RootState) => state.auth)

    const { isLoading: isUserLoading } = useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            try {
                const response = await axios.get(
                    Constants.ApiUrl('Authentication/me'),
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                if (response.data) {
                    dispatch(setUser(response.data))
                }

                return response.data
            } catch (error) {
                const errors = error as AxiosError
                console.log(errors)

                if (errors?.response?.status === 401) {
                    throw new Error('Invalid username or password')
                }

                throw new Error('An unknown error has occured')
            }
        },
        enabled: !!token,
    })

    return [isUserLoading] as const
}

export default useUser
