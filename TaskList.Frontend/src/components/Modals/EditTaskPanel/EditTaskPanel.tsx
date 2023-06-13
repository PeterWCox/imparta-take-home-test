import { PrimaryButton, TextField } from '@fluentui/react'
import { Panel } from '@fluentui/react/lib/Panel'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import useEditTask from '../../../hooks/tasks/useEditTask'
import useRemoveTask from '../../../hooks/tasks/useRemoveTask'
import { DangerButton } from '../../../lib/DangerButton/DangerButton'
import { Task } from '../../../models/Task'
import { AddDueDate } from '../../AddDueDate/AddDueDate'
import styles from './EditTaskPanel.module.css'

const validationSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }).max(100, {
        message: 'Title must be less than 100 characters',
    }),
    // dueDate: z.date(),
})

type ValidationSchema = z.infer<typeof validationSchema>

export interface IEditTaskPanelProps {
    task: Task
    isPanelOpen: boolean
    onPanelDismiss: () => void
}

export const EditTaskPanel = (props: IEditTaskPanelProps) => {
    //States
    const [dueDate, setDueDate] = useState<Date | null>(props.task.dueDate)

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
            isFooterAtBottom={true}
        >
            <form
                className={styles.form}
                onSubmit={handleSubmit((data) => {
                    editTask({
                        id: props.task.id,
                        title: data.title,
                        dueDate: dueDate,
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

                <AddDueDate
                    dueDate={dueDate}
                    setDueDate={(date) => {
                        setDueDate(date)
                    }}
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
