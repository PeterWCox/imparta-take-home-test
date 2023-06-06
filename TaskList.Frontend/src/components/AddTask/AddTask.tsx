import { PrimaryButton, TextField } from '@fluentui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Status } from '../../enums/Enums'
import useAddTask from '../../hooks/tasks/useAddTask'
import styles from './AddTask.module.css'

const validationSchema = z.object({
    title: z
        .string()
        .nonempty({ message: 'Task name is required' })
        .max(100, { message: 'Task name must be less than 100 characters' }),
})

type ValidationSchema = z.infer<typeof validationSchema>

export interface IAddTaskProps {
    status: Status
}

export const AddTask = (props: IAddTaskProps) => {
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
    const [addTask] = useAddTask()

    return (
        <form
            className={styles.addTask}
            onSubmit={handleSubmit((data) => {
                addTask({
                    title: data.title,
                    status: props.status,
                })
                reset({
                    title: '',
                })
            })}
        >
            <Controller
                control={control}
                name="title"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                        id="Add Task"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        errorMessage={errors.title && errors.title?.message}
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
