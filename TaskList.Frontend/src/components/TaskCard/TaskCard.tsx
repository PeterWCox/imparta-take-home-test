import { Icon, Text } from '@fluentui/react'
import { useBoolean } from '@fluentui/react-hooks'
import { useCallback, useState } from 'react'
import useEditTask from '../../hooks/tasks/useEditTask'
import { Task } from '../../models/Task'
import { EditTaskPanel } from '../EditTaskPanel/EditTaskPanel'
import styles from './TaskCard.module.css'

export interface ITaskCardProps {
    task: Task
}

export const TaskCard = (props: ITaskCardProps) => {
    //States
    const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
        useBoolean(false)
    const [updatedTodo, setUpdatedTodo] = useState<Task>(props.task)

    const [edit] = useEditTask(updatedTodo)

    //Handlers
    const onCheckboxClick = useCallback(() => {
        setUpdatedTodo({
            ...props.task,
            isDone: !props.task.isDone,
        })
        edit()
    }, [props.task])

    return (
        <>
            {/* Edit Panel */}
            <EditTaskPanel
                task={props.task}
                isOpen={isOpen}
                onDismiss={dismissPanel}
            />
            {/* Task Card */}
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
        </>
    )
}
