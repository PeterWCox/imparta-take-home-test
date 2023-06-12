import { Dropdown } from '@fluentui/react'

import useTaskLists from '../../hooks/taskLists/useTaskLists'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setTasklist } from '../../redux/slices/taskListSlice'

export const TaskListDropdown = () => {
    //Redux
    const dispatch = useAppDispatch()
    const { selectedTaskList } = useAppSelector((state) => state.taskList)

    //Hooks
    const [taskLists, isTaskListsLoading, taskListError] = useTaskLists()

    //Handlers
    const handleDropdownChange = (e: any, option: any) => {
        const dropdownOption = taskLists?.find(
            (taskList: any) => taskList.id === option.key
        )
        dispatch(setTasklist(dropdownOption))
    }

    return (
        <>
            <Dropdown
                selectedKey={selectedTaskList ? selectedTaskList.id : undefined}
                placeholder="Select a tasklist"
                disabled={isTaskListsLoading}
                options={taskLists?.map((taskList: any) => {
                    return {
                        key: taskList.id,
                        text: taskList.title,
                    }
                })}
                onChange={handleDropdownChange}
            />
        </>
    )
}
