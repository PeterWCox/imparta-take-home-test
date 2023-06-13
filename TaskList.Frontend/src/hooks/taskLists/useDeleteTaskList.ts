import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setSelectedTaskList } from '../../redux/slices/taskListSlice'
import { Constants } from '../../utils/Constants'
import { QueryClientUtils } from '../../utils/QueryClientUtils'

const useDeleteTaskList = () => {
    //Hooks
    const queryClient = useQueryClient()
    const token = useAppSelector((state) => state.auth.token)
    const { selectedTaskList } = useAppSelector((state) => state.taskList)
    const dispatch = useAppDispatch()

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

                await axios.delete(Constants.ApiUrl(`TaskLists/${id}`), {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                //Refetch the task lists as one has been deleted
                queryClient.invalidateQueries([
                    QueryClientUtils.TASKLISTS_QUERY_KEY,
                ])

                //Reset the selected task list
                if (selectedTaskList.id === id) {
                    dispatch(setSelectedTaskList(null))
                }
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

export default useDeleteTaskList
