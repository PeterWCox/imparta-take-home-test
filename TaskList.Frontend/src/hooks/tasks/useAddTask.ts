import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { PartialTask } from '../../models/Task'
import { useAppSelector } from '../../redux/hooks'
import { Constants } from '../../utils/Constants'
import { QueryClientUtils } from '../../utils/QueryClientUtils'

const useAddTask = () => {
    //Hooks
    const queryClient = useQueryClient()
    const { token } = useAppSelector((state) => state.auth)
    const { selectedTaskList } = useAppSelector((state) => state.taskList)

    //Mutations
    const { mutateAsync: addTask } = useMutation(
        ['addTask', selectedTaskList],
        {
            mutationFn: async (task: PartialTask) => {
                try {
                    if (!selectedTaskList) {
                        return []
                    }

                    await axios.post(
                        Constants.ApiUrl(
                            `TaskLists/${selectedTaskList?.id}/Tasks`
                        ),
                        task,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )

                    queryClient.invalidateQueries([
                        QueryClientUtils.TASKS_QUERY_KEY,
                    ])
                } catch (error) {
                    const errors = error as AxiosError

                    if (errors?.response?.status === 401) {
                        throw new Error(
                            'You are not authenticated - please refresh the page and try logging in again.'
                        )
                    }
                }
            },
        }
    )

    return [addTask] as const
}

export default useAddTask
