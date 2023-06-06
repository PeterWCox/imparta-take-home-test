import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useAppSelector } from '../../redux/hooks'
import { RootState } from '../../redux/store'
import { Constants } from '../../utils/Constants'
import { QueryClientUtils } from '../../utils/QueryClientUtils'

const useTasks = () => {
    const { token } = useAppSelector((state: RootState) => state.auth)

    const url = Constants.ApiUrl(`Tasks`)
    console.log('url', url)

    const { data: tasks, isLoading } = useQuery({
        queryKey: [QueryClientUtils.TASKS_QUERY_KEY],
        queryFn: async () => {
            try {
                const response = await axios.get(Constants.ApiUrl(`Tasks`), {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

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

    return [tasks, isLoading] as const
}

export default useTasks
