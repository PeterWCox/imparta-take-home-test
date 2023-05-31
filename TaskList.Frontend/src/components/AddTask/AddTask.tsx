import { IIconProps, TextField } from '@fluentui/react'
import { useCallback, useState } from 'react'
import { useAppDispatch } from '../../redux/hooks'
import { addTask } from '../../redux/slices/tasksSlice'

export const AddTask = () => {
    //States
    const [taskName, setTaskName] = useState('')

    //Hooks
    const dispatch = useAppDispatch()

    //Callbacks
    const onTaskNameChange = useCallback(
        (
            _event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
            newValue?: string
        ) => {
            setTaskName(newValue ?? '')
        },
        [taskName]
    )

    const onTaskNameKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            if (e.key === 'Enter' && taskName?.trim() !== '') {
                dispatch(addTask(taskName))
                setTaskName('')
            }
        },
        [taskName]
    )

    return (
        <div
            style={{
                margin: '0 auto',
                width: '100%',
                maxWidth: '600px',
            }}
        >
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
