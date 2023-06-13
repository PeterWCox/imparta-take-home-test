import { TextField } from '@fluentui/react'
import { PrimaryButton } from '@fluentui/react/lib/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import useDeleteTaskList from '../../../hooks/taskLists/useDeleteTaskList'
import useEditTaskList from '../../../hooks/taskLists/useEditTaskList'
import { DangerButton } from '../../../lib/DangerButton/DangerButton'
import { ModalForm } from '../../../lib/ModalForm/ModalForm'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { setSelectedTaskList } from '../../../redux/slices/taskListSlice'
import styles from './EditTaskListModal.module.css'

const validationSchema = z.object({
    title: z.string().min(1, { message: 'Username is required' }).max(100, {
        message: 'TaskList name must be less than 100 characters',
    }),
})

type ValidationSchema = z.infer<typeof validationSchema>

export interface IEditTaskListModalProps {
    isModalOpen: boolean
    hideModal: () => void
}

export const EditTaskListModal = (props: IEditTaskListModalProps) => {
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
    const [editTaskList] = useEditTaskList()
    const [deleteTaskList] = useDeleteTaskList()

    //Redux
    const dispatch = useAppDispatch()

    return (
        <ModalForm
            title={'Edit Task Lists'}
            isModalOpen={props.isModalOpen}
            hideModal={props.hideModal}
            onSubmit={handleSubmit((data) => {
                editTaskList({
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

                <DangerButton
                    text="Delete"
                    onClick={() => {
                        if (!selectedTaskList) return
                        deleteTaskList(selectedTaskList.id)
                        dispatch(setSelectedTaskList(null))
                        props.hideModal()
                    }}
                />
            </div>
        </ModalForm>
    )
}
