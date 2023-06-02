import { IIconProps, TextField } from '@fluentui/react'
import { useCallback, useState } from 'react'
import { useAppDispatch } from '../../redux/hooks'
// import { thunkAddTask } from '../../redux/slices/tasksSlice'
import styles from './AddTask.module.css'

export const AddTask = () => {
    //States
    const [taskName, setTaskName] = useState('')

    //Hooks
    const dispatch = useAppDispatch()

    //Mutations

    //Redux
    // const dispatch = useAppDispatch()
    // const { token, user } = useAppSelector((state: RootState) => state.auth)

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
                // dispatch(thunkAddTask(taskName))
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
