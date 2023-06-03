import { IIconProps, TextField } from '@fluentui/react'
import { useCallback, useState } from 'react'
import useAddTask from '../../hooks/tasks/useAddTask'
import styles from './AddTask.module.css'

export const AddTask = () => {
    //States
    const [taskName, setTaskName] = useState('')

    //Hooks
    const [addTask] = useAddTask(taskName)

    //Callbacks
    const onTaskNameChange = useCallback(
        (
            _: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
            newValue?: string
        ) => {
            setTaskName(newValue ?? '')
        },
        [taskName]
    )

    const onTaskNameKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            if (e.key === 'Enter' && taskName?.trim() !== '') {
                addTask()
                setTaskName('')
            }
        },
        [taskName]
    )

    return (
        <div className={styles.AddTask}>
            <TextField
                value={taskName}
                iconProps={iconProps}
                onChange={onTaskNameChange}
                onKeyDown={onTaskNameKeyDown}
                placeholder="Add a task"
            />
        </div>
    )
}

const iconProps: IIconProps = { iconName: 'Add' }
