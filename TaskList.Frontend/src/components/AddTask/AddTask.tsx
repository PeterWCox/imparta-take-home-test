import { IIconProps, TextField } from '@fluentui/react'
import { useCallback, useState } from 'react'

export const AddTask = () => {
    //States
    const [taskName, setTaskName] = useState('')

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
                console.log('Add task', taskName)
                setTaskName('')
            }
        },
        [taskName]
    )

    return (
        <>
            <TextField
                value={taskName}
                label="With an icon"
                iconProps={iconProps}
                onChange={onTaskNameChange}
                onKeyDown={onTaskNameKeyDown}
                placeholder="Add a task"
            />
        </>
    )
}

const iconProps: IIconProps = { iconName: 'Add' }
