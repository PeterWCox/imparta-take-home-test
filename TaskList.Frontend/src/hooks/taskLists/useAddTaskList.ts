import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { PartialTaskList } from '../../models/TaskList'
import { Constants } from '../../utils/Constants'
import { QueryClientUtils } from '../../utils/QueryClientUtils'

const useAddTaskList = () => {
    //Redux
    const queryClient = useQueryClient()

    //Mutations
    const {
        mutateAsync: addTaskList,
        error: addTaskListError,
        isLoading: isAddTaskListLoading,
    } = useMutation([], {
        mutationFn: async (taskList: PartialTaskList) => {
            try {
                await axios.post(Constants.ApiUrl(`TaskLists`), taskList)

                queryClient.invalidateQueries([
                    QueryClientUtils.TASKLISTS_QUERY_KEY,
                ])
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

    return [addTaskList, addTaskListError, isAddTaskListLoading] as const
}

export default useAddTaskList
