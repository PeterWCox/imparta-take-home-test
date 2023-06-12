import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useAppSelector } from '../../redux/hooks'
import { Constants } from '../../utils/Constants'
import { QueryClientUtils } from '../../utils/QueryClientUtils'

const useTasks = () => {
    const { selectedTaskList } = useAppSelector((state) => state.taskList)
    const { token } = useAppSelector((state) => state.auth)

    const { data: tasks, isLoading } = useQuery({
        queryKey: [QueryClientUtils.TASKS_QUERY_KEY, selectedTaskList],
        queryFn: async () => {
            try {
                if (!selectedTaskList) {
                    return []
                }

                const response = await axios.get(
                    Constants.ApiUrl(`TaskLists/${selectedTaskList.id}/Tasks`),
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
        // enabled: !!token,
    })

    return [tasks, isLoading] as const
}

export default useTasks
