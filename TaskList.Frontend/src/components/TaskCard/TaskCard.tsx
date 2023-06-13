import {
    ContextualMenu,
    IContextualMenuItem,
    Icon,
    Text,
} from '@fluentui/react'
import { useBoolean } from '@fluentui/react-hooks'
import { useCallback, useRef, useState } from 'react'
import {
    default as useAddTask,
    default as useEditTask,
} from '../../hooks/tasks/useEditTask'
import useRemoveTask from '../../hooks/tasks/useRemoveTask'
import { Task } from '../../models/Task'
import { EditTaskPanel } from '../Modals/EditTaskPanel/EditTaskPanel'
import styles from './TaskCard.module.css'

export interface ITaskCardProps {
    task: Task
}

export const TaskCard = (props: ITaskCardProps) => {
    //States
    const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
        useBoolean(false)
    const [showContextualMenu, setShowContextualMenu] = useState<boolean>(false)

    //Refs
    const linkRef = useRef(null)

    //Hooks
    const [add] = useAddTask()
    const [editTask] = useEditTask()
    const [remove] = useRemoveTask()

    //Handlers
    const onCheckboxClick = useCallback(() => {
        editTask({
            ...props.task,
            isDone: !props.task.isDone,
        })
    }, [props.task])

    const onStarClick = useCallback(() => {
        editTask({
            ...props.task,
            isImportant: !props.task.isImportant,
        })
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
                            editTask({
                                id: props.task.id,
                                status: 0,
                            })
                        },
                    },
                    {
                        key: 'newItem',
                        iconProps: { iconName: 'TimelineDelivery' },
                        text: 'In Progress',
                        onClick: () => {
                            editTask({
                                id: props.task.id,
                                status: 1,
                            })
                        },
                    },
                    {
                        key: 'completed',
                        iconProps: { iconName: 'CompletedSolid' },
                        text: 'Completed',
                        onClick: () => {
                            editTask({
                                id: props.task.id,
                                status: 2,
                            })
                        },
                    },
                ],
            },
        },
        {
            key: 'delete',
            iconProps: { iconName: 'Delete' },
            text: 'Delete',
            onClick: () => remove(props.task.id),
        },
        {
            key: 'duplicate',
            iconProps: { iconName: 'Copy' },
            text: 'Copy',
            onClick: () =>
                add({
                    title: props.task.title,
                }),
        },
    ]

    return (
        <>
            {/* Edit Panel */}
            <EditTaskPanel
                task={props.task}
                isPanelOpen={isOpen}
                onPanelDismiss={dismissPanel}
            />

            {/* Task Card */}
            <li className={styles.task}>
                {/* Checkbox */}
                <div className={styles.checkbox} onClick={onCheckboxClick}>
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
                    {/* Add a star icon from FluentUI */}

                    <ContextualMenu
                        items={menuItems}
                        hidden={!showContextualMenu}
                        target={linkRef}
                        onItemClick={onHideContextualMenu}
                        onDismiss={onHideContextualMenu}
                    />
                </div>
                {/* Important Star */}
                <div className={styles.star} onClick={onStarClick}>
                    <Icon
                        iconName={`${
                            props.task.isImportant
                                ? 'FavoriteStarFill'
                                : 'FavoriteStar'
                        }`}
                    />
                </div>
            </li>
        </>
    )
}
