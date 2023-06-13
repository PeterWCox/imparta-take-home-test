import { PrimaryButton, TextField } from '@fluentui/react'
import { Panel } from '@fluentui/react/lib/Panel'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import useEditTask from '../../../hooks/tasks/useEditTask'
import useRemoveTask from '../../../hooks/tasks/useRemoveTask'
import { DangerButton } from '../../../lib/DangerButton/DangerButton'
import { Task } from '../../../models/Task'
import styles from './EditTaskPanel.module.css'

const validationSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }).max(100, {
        message: 'Title must be less than 100 characters',
    }),
})

type ValidationSchema = z.infer<typeof validationSchema>

export interface IEditTaskPanelProps {
    task: Task
    isPanelOpen: boolean
    onPanelDismiss: () => void
}

export const EditTaskPanel = (props: IEditTaskPanelProps) => {
    //React-Hook-Form
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ValidationSchema>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            title: props.task.title,
        },
    })

    //Hooks
    const [editTask] = useEditTask()
    const [removeTask] = useRemoveTask()

    return (
        <Panel
            isOpen={props.isPanelOpen}
            onDismiss={props.onPanelDismiss}
            isLightDismiss
            headerText="Edit Task"
            closeButtonAriaLabel="Close"
            // onRenderFooterContent={onRenderFooterContent}
            isFooterAtBottom={true}
        >
            <form
                className={styles.form}
                onSubmit={handleSubmit((data) => {
                    editTask({
                        id: props.task.id,
                        title: data.title,
                    })
                    props.onPanelDismiss()
                })}
            >
                {/* Username */}
                <Controller
                    control={control}
                    name="title"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextField
                            id="Title"
                            label="Title"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                            errorMessage={errors.title && errors.title?.message}
                        />
                    )}
                />

                <div className={styles.buttonGroup}>
                    {/* Delete button */}
                    <DangerButton
                        text="Delete"
                        onClick={() => {
                            removeTask(props.task.id)
                            props.onPanelDismiss()
                        }}
                    />

                    {/* Save button */}
                    <PrimaryButton text="Save" type="submit" />
                </div>
            </form>
        </Panel>
    )
}
