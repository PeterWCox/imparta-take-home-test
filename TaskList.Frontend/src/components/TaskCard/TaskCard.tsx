import {
    ContextualMenu,
    IContextualMenuItem,
    Icon,
    Text,
} from '@fluentui/react'
import { useBoolean } from '@fluentui/react-hooks'
import React, { useCallback, useRef, useState } from 'react'
import useAddTask from '../../hooks/tasks/useAddTask'
import useEditTask from '../../hooks/tasks/useEditTask'
import useRemoveTask from '../../hooks/tasks/useRemoveTask'
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
    const [showContextualMenu, setShowContextualMenu] = React.useState(false)
    const [title, setTitle] = useState<string>(props.task.title)

    //Refs
    const linkRef = useRef(null)

    //Hooks
    const [add] = useAddTask({
        title: title,
    })
    const [edit] = useEditTask(updatedTodo)
    const [remove] = useRemoveTask(props.task.id)

    //Handlers
    const onCheckboxClick = useCallback(() => {
        setUpdatedTodo({
            ...props.task,
            isDone: !props.task.isDone,
        })
        edit()
    }, [props.task])

    const onTaskCardClick = useCallback((ev: React.MouseEvent<HTMLElement>) => {
        ev.preventDefault() // don't navigate
        setShowContextualMenu(true)
    }, [])

    const onHideContextualMenu = useCallback(
        () => setShowContextualMenu(false),
        []
    )

    const menuItems: IContextualMenuItem[] = [
        {
            key: 'newItem',
            iconProps: { iconName: 'AddNotes' },
            text: 'Details',
            onClick: () => openPanel(),
        },
        {
            key: 'share',
            iconProps: { iconName: 'AwayStatus' },
            text: 'Status',
            subMenuProps: {
                items: [
                    {
                        key: 'pending',
                        iconProps: { iconName: 'Timer' },
                        text: 'Pending',
                        onClick: () => {
                            setUpdatedTodo({
                                ...props.task,
                                status: 0,
                            })
                            edit()
                        },
                    },
                    {
                        key: 'newItem',
                        iconProps: { iconName: 'TimelineDelivery' },
                        text: 'In Progress',
                        onClick: () => {
                            setUpdatedTodo({
                                ...props.task,
                                status: 1,
                            })
                            edit()
                        },
                    },
                    {
                        key: 'completed',
                        iconProps: { iconName: 'CompletedSolid' },
                        text: 'Completed',
                        onClick: () => {
                            setUpdatedTodo({
                                ...props.task,
                                status: 2,
                            })
                            edit()
                        },
                    },
                ],
            },
        },
        {
            key: 'delete',
            iconProps: { iconName: 'Delete' },
            text: 'Delete',
            onClick: () => remove(),
        },
        {
            key: 'duplicate',
            iconProps: { iconName: 'Copy' },
            text: 'Copy',
            onClick: () => add(),
        },
    ]

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
                    ref={linkRef}
                    onContextMenu={(e) => {
                        e.preventDefault()
                        onTaskCardClick(e)
                    }}
                    onClick={(e) => {
                        e.preventDefault()
                        onTaskCardClick(e)
                    }}
                    className={`${styles.title} ${
                        props.task.isDone ? styles.done : null
                    }`}
                >
                    <Text>{props.task.title}</Text>
                    <ContextualMenu
                        items={menuItems}
                        hidden={!showContextualMenu}
                        target={linkRef}
                        onItemClick={onHideContextualMenu}
                        onDismiss={onHideContextualMenu}
                    />
                </div>
            </li>
        </>
    )
}
