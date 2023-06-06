import { DefaultButton, PrimaryButton, TextField } from '@fluentui/react'
import { Panel } from '@fluentui/react/lib/Panel'
import { useState } from 'react'
import useEditTask from '../../hooks/tasks/useEditTask'
import useRemoveTask from '../../hooks/tasks/useRemoveTask'
import { Task } from '../../models/Task'
import styles from './EditTaskPanel.module.css'

export interface IEditTaskPanelProps {
    task: Task
    isOpen: boolean
    onDismiss: () => void
}

export const EditTaskPanel = (props: IEditTaskPanelProps) => {
    //States
    const [updatedTask, setUpdatedTask] = useState(props.task)

    //Hooks
    const [editTask] = useEditTask()
    const [removeTask] = useRemoveTask()

    const onRenderFooterContent = () => (
        <div className={styles.buttonGroup}>
            {/* Delete button */}
            <DefaultButton
                text="Delete"
                onClick={() => {
                    removeTask(props.task.id)
                    props.onDismiss()
                }}
                style={{
                    backgroundColor: '#de383b',
                    borderColor: '#de383b',
                    color: 'white',
                }}
            />

            {/* Save button */}
            <PrimaryButton
                text="Save"
                onClick={() => {
                    editTask(updatedTask)
                    props.onDismiss()
                }}
            />
        </div>
    )

    return (
        <Panel
            isOpen={props.isOpen}
            onDismiss={props.onDismiss}
            isLightDismiss
            headerText="Edit Panel"
            closeButtonAriaLabel="Close"
            onRenderFooterContent={onRenderFooterContent}
            isFooterAtBottom={true}
        >
            <div className={styles.form}>
                {/* Title */}
                <TextField
                    label="Title"
                    value={updatedTask.title}
                    onChange={(_, newValue) => {
                        setUpdatedTask({
                            ...updatedTask,
                            title: newValue ?? '',
                        })
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && updatedTask.title.length > 0) {
                            editTask({
                                ...updatedTask,
                            })
                            props.onDismiss()
                        }
                    }}
                    errorMessage={
                        updatedTask.title.length === 0
                            ? 'Title cannot be empty'
                            : ''
                    }
                />
            </div>
        </Panel>
    )
}
