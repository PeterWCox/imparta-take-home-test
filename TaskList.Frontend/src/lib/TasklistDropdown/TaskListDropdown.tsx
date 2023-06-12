import { Dropdown, IDropdownOption } from '@fluentui/react'

import React from 'react'
import useTaskLists from '../../hooks/taskLists/useTaskLists'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

export const TaskListDropdown = () => {
    //Redux
    const dispatch = useAppDispatch()
    const { selectedTaskList } = useAppSelector((state) => state.taskList)

    //States
    const [selectedItem, setSelectedItem] = React.useState<IDropdownOption>()

    //Hooks
    const [taskLists] = useTaskLists()

    //Handlers
    const handleDropdownChange = (e: any, option: any) => {





        setSelectedItem(option)

    const opts = taskLists?.map((taskList: any) => {
        return {
            key: taskList.id,
            text: taskList.title,
        }
    })

    console.log(opts)

    return (
        <Dropdown
            selectedKey={selectedItem ? selectedItem.key : undefined}
            placeholder="Select a tasklist"
            options={taskLists?.map((taskList: any) => {
                return {
                    key: taskList.id,
                    text: taskList.title,
                }
            })}
            onChange={()}
        />
    )
}
