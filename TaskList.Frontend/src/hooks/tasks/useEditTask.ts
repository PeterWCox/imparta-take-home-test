import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { JSONPatchFactory } from '../../models/JsonPatch'
import { PartialTask } from '../../models/Task'
import { useAppSelector } from '../../redux/hooks'
import { Constants } from '../../utils/Constants'
import { QueryClientUtils } from '../../utils/QueryClientUtils'

const useEditTask = () => {
    //Hooks
    const queryClient = useQueryClient()
    const { selectedTaskList } = useAppSelector((state) => state.taskList)

    //Mutations
    const { mutateAsync: editTask, error: editTaskError } = useMutation(
        ['editTask'],
        {
            mutationFn: async (task: PartialTask) => {
                try {
                    console.log(selectedTaskList)
                    if (!selectedTaskList) {
                        return
                    }

                    const request = new JSONPatchFactory()

                    if (task.title !== undefined) {
                        request.add('/title', task.title)
                    }
                    if (task.isDone !== undefined) {
                        request.add('/isDone', task.isDone)
                    }
                    if (task.status !== undefined) {
                        request.add('/status', task.status)
                    }
                    if (task.isImportant !== undefined) {
                        request.add('/isImportant', task.isImportant)
                    }
                    if (task.dueDate !== undefined) {
                        request.add('/dueDate', task.dueDate?.toJSON())
                    }

                    await axios.patch(
                        Constants.ApiUrl(
                            `TaskLists/${selectedTaskList?.id}/Tasks/${task.id}`
                        ),
                        request.getJsonPatch()
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
