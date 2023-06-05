import { PrimaryButton, TextField } from '@fluentui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Status } from '../../enums/Enums'
import useAddTask from '../../hooks/tasks/useAddTask'
import styles from './AddTask.module.css'

const validationSchema = z.object({
    Title: z
        .string()
        .nonempty({ message: 'Task name is required' })
        .max(100, { message: 'Task name must be less than 100 characters' }),
})

type ValidationSchema = z.infer<typeof validationSchema>

export interface IAddTaskProps {
    status: Status
}

export const AddTask = (props: IAddTaskProps) => {
    //States
    const [taskName, setTaskName] = useState<string>('')

    //React-Hook-Form
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<ValidationSchema>({
        resolver: zodResolver(validationSchema),
    })

    //Hooks
    const [addTask] = useAddTask({
        title: taskName,
        status: props.status,
    })

    return (
        <form
            className={styles.addTask}
            onSubmit={handleSubmit((data) => {
                setTaskName(data.Title)
                addTask()
                reset({
                    Title: '',
                })
            })}
        >
            <Controller
                control={control}
                name="Title"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                        id="Add Task"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        errorMessage={errors.Title && errors.Title?.message}
                    />
                )}
            />

            <PrimaryButton
                type="submit"
                placeholder="Add Task"
                styles={{
                    root: {
                        width: 'fit-content',
                    },
                }}
            >
                Add Task
            </PrimaryButton>
        </form>
    )
}
