import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { JSONPatchFactory } from '../../models/JsonPatch'
import { PartialTaskList } from '../../models/TaskList'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setSelectedTaskList } from '../../redux/slices/taskListSlice'
import { Constants } from '../../utils/Constants'
import { QueryClientUtils } from '../../utils/QueryClientUtils'

const useEditTaskList = () => {
    //Redux
    const queryClient = useQueryClient()
    const { selectedTaskList } = useAppSelector((state) => state.taskList)
    const dispatch = useAppDispatch()

    //Mutations
    const {
        mutateAsync: editTaskList,
        error,
        isLoading: isEditTaskListLoading,
    } = useMutation([], {
        mutationFn: async (taskList: PartialTaskList) => {
            try {
                if (!selectedTaskList) {
                    return
                }

                const request = new JSONPatchFactory()
                    .add('/title', taskList.title)
                    .getJsonPatch()

                await axios.patch(
                    Constants.ApiUrl(`TaskLists/${selectedTaskList.id}`),
                    request
                )

                queryClient.invalidateQueries([
                    QueryClientUtils.TASKLISTS_QUERY_KEY,
                ])

                dispatch(setSelectedTaskList(null))
            } catch (error) {
                const errorTS = error as any
                const errorMessage: any = errorTS.response?.data.message

                if (errorMessage) {
                    throw new Error(errorMessage)
                }

                throw new Error(
                    'An unknown issue has occured. Please try again later.'
                )
            }
        },
    })

    return [editTaskList, error, isEditTaskListLoading] as const
}

export default useEditTaskList
