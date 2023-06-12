import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useAppSelector } from '../../redux/hooks'
import { Constants } from '../../utils/Constants'
import { QueryClientUtils } from '../../utils/QueryClientUtils'

const useRemoveTask = () => {
    //Hooks
    const queryClient = useQueryClient()
    const token = useAppSelector((state) => state.auth.token)
    const { selectedTaskList } = useAppSelector((state) => state.taskList)

    //Mutations
    const {
        mutateAsync: removeTask,
        isLoading: isRemoveTaskLoading,
        error: removeTaskError,
    } = useMutation(['removeTask'], {
        mutationFn: async (id: number) => {
            try {
                if (!selectedTaskList) {
                    return []
                }

                await axios.delete(
                    Constants.ApiUrl(
                        `TaskLists/${selectedTaskList?.id}/Tasks/${id}`
                    ),
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

                throw new Error('An unknown error has occured')
            }
        },
    })

    return [removeTask, isRemoveTaskLoading, removeTaskError] as const
}

export default useRemoveTask
