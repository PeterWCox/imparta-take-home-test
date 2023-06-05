import { PrimaryButton, TextField } from '@fluentui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import useAddTask from '../../hooks/tasks/useAddTask'
import styles from './AddTask.module.css'

const validationSchema = z.object({
    Title: z
        .string()
        .nonempty({ message: 'Task name is required' })
        .max(100, { message: 'Task name must be less than 100 characters' }),
})

type ValidationSchema = z.infer<typeof validationSchema>

export const AddTask = () => {
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
    const [addTask] = useAddTask(taskName)

    return (
        <form
            className={styles.AddTask}
            onSubmit={handleSubmit((data) => {
                setTaskName(data.Title)
                addTask()
                reset()
            })}
            style={
                {
                    // display: 'flex',
                    // gap: '1rem',
                    // width: '100%',
                    // alignItems: 'center',
                    // margin: '0 auto',
                    // justifyContent: 'center',
                }
            }
        >
            {/* Username */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    alignItems: 'center',
                    width: 600,
                }}
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
                    styles={{
                        root: {
                            width: 'fit-content',
                        },
                    }}
                >
                    Add Task
                </PrimaryButton>
            </div>
        </form>
    )
}
