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
import { AddMyDay } from '../../AddMyDay/AddMyDay'
import styles from './EditTaskPanel.module.css'

const validationSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }).max(100, {
        message: 'Title must be less than 100 characters',
    }),
    notes: z.string().max(1000, {
        message: 'Notes must be less than 1000 characters',
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
    const [isMyDay, setIsMyDay] = useState<boolean>(props.task.isMyDay)

    //React-Hook-Form
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ValidationSchema>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            title: props.task.title ?? '',
            notes: props.task.notes ?? '',
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
        >
            <form
                className={styles.form}
                onSubmit={handleSubmit((data) => {
                    console.log(data)
                    editTask({
                        id: props.task.id,
                        title: data.title,
                        notes: data.notes,
                        dueDate: dueDate,
                        isMyDay: isMyDay,
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
                    setDueDate={(date: Date | null) => {
                        setDueDate(date)
                    }}
                />

                <AddMyDay
                    isMyDay={isMyDay}
                    setIsMyDay={() => {
                        setIsMyDay(!isMyDay)
                    }}
                />

                {/* Username */}
                <Controller
                    control={control}
                    name="notes"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextField
                            id="Notes"
                            label="Notes"
                            onChange={onChange}
                            multiline
                            autoAdjustHeight
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
