import { Icon, Panel, Text } from '@fluentui/react'
import { Task } from '../../models/Task'
import styles from './TaskCard.module.css'
import { useCallback, useState } from 'react'
import { useAppDispatch } from '../../redux/hooks'
import { updateTask } from '../../redux/slices/tasksSlice'
import { EditTaskPanel } from '../EditTaskPanel/EditTaskPanel'
import { useBoolean } from '@fluentui/react-hooks'

export interface ITaskCardProps {
    task: Task
}

export const TaskCard = (props: ITaskCardProps) => {
    //States
    const [showEditPanel, setShowEditPanel] = useState(false)
    const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
        useBoolean(false)

    //Hooks
    const dispatch = useAppDispatch()

    //Handlers
    const onCheckboxClick = useCallback(() => {
        dispatch(
            updateTask({
                ...props.task,
                isDone: !props.task.isDone,
            })
        )
    }, [props.task])

    return (
        <>
            <li className={styles.task}>
                {/* Checkbox */}
                <div className={styles.icon} onClick={onCheckboxClick}>
                    <Icon
                        iconName={`${
                            props.task.isDone
                                ? 'SkypeCircleCheck'
                                : 'CircleRing'
                        }`}
                    />
                </div>
                {/* Title */}
                <div
                    onClick={openPanel}
                    className={`${styles.title} ${
                        props.task.isDone ? styles.done : null
                    }`}
                >
                    <Text>{props.task.title}</Text>
                </div>
            </li>

            {/* Edit Panel */}
            <EditTaskPanel
                task={props.task}
                isOpen={isOpen}
                onDismiss={dismissPanel}
            />
        </>
    )
}
