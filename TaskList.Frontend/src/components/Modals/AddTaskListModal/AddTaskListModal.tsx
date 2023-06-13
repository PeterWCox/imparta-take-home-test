import { TextField } from '@fluentui/react'
import { PrimaryButton } from '@fluentui/react/lib/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import useAddTaskList from '../../../hooks/taskLists/useAddTaskList'
import { ModalForm } from '../../../lib/ModalForm/ModalForm'
import { useAppSelector } from '../../../redux/hooks'
import styles from './AddTaskListModal.module.css'

const validationSchema = z.object({
    title: z.string().min(1, { message: 'Tasklist is required' }).max(100, {
        message: 'TaskList name must be less than 100 characters',
    }),
})

type ValidationSchema = z.infer<typeof validationSchema>

export interface IAddTaskListModalProps {
    isModalOpen: boolean
    hideModal: () => void
}

export const AddTaskListModal = (props: IAddTaskListModalProps) => {
    //States
    const { selectedTaskList } = useAppSelector((state) => state.taskList)

    //React-Hook-Form
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ValidationSchema>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            title: selectedTaskList?.title ?? '',
        },
    })

    //Queries
    const [addTaskList] = useAddTaskList()

    return (
        <ModalForm
            title={'Add task list'}
            isModalOpen={props.isModalOpen}
            hideModal={props.hideModal}
            onSubmit={handleSubmit((data) => {
                addTaskList({
                    title: data.title,
                })
                props.hideModal()
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

            {/* Button Group */}
            <div className={styles.buttonGroup}>
                <PrimaryButton
                    text="Save Changes"
                    type="submit"
                    disabled={Object.keys(errors).length > 0}
                />
            </div>
        </ModalForm>
    )
}
