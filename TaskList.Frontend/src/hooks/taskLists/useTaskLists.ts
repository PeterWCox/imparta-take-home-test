import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useAppSelector } from '../../redux/hooks'
import { RootState } from '../../redux/store'
import { Constants } from '../../utils/Constants'
import { QueryClientUtils } from '../../utils/QueryClientUtils'

const useTaskLists = () => {
    const { token } = useAppSelector((state: RootState) => state.auth)

    const {
        data: taskLists,
        isLoading: isTaskListsLoading,
        error: taskListsError,
    } = useQuery({
        queryKey: [QueryClientUtils.TASKS_QUERY_KEY],
        queryFn: async () => {
            try {
                const response = await axios.get(
                    Constants.ApiUrl(`TaskLists`),
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

    return [taskLists, isTaskListsLoading, taskListsError] as const
}

export default useTaskLists
