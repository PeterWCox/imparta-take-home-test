import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Task } from '../../models/Task'
import { useAppSelector } from '../../redux/hooks'
import { Constants } from '../../utils/Constants'
import { QueryClientUtils } from '../../utils/QueryClientUtils'

const useEditTask = (task: Task) => {
    //Hooks
    const queryClient = useQueryClient()
    const token = useAppSelector((state) => state.auth.token)

    //Mutations
    const { mutateAsync: editTask, error: editTaskError } = useMutation(
        ['edit'],
        {
            mutationFn: async () => {
                try {
                    await axios.put(
                        `${Constants.BASE_URL}Tasks/${task.id}`,
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

                    throw new Error('An unknown error has occured')
                }
            },
        }
    )

    return [editTask, editTaskError] as const
}

export default useEditTask
