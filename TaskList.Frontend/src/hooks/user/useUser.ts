import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useAppSelector } from '../../redux/hooks'
import { RootState } from '../../redux/store'
import { Constants } from '../../utils/Constants'

const useUser = () => {
    //Redux
    const { token } = useAppSelector((state: RootState) => state.auth)

    const { isLoading, data } = useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            try {
                const response = await axios.get(
                    Constants.ApiUrl('User'),
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

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

    return [data, isLoading] as const
}

export default useUser
