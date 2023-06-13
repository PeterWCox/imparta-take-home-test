import { MessageBar, MessageBarType, TextField } from '@fluentui/react'
import { PrimaryButton } from '@fluentui/react/lib/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import useLogin from '../../../hooks/login/useLogin'
import { ModalForm } from '../../../lib/ModalForm/ModalForm'
import styles from './LoginModal.module.css'

export interface ILoginModalProps {
    isModalOpen: boolean
    hideModal: () => void
}

const validationSchema = z.object({
    Email: z.string().nonempty({ message: 'Email is required' }).email({
        message: 'Please enter a valid email address',
    }),
    Password: z.string().min(1, { message: 'Password is required' }),
})

type ValidationSchema = z.infer<typeof validationSchema>

export const LoginModal = (props: ILoginModalProps) => {
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
    const [login, error, isLoading] = useLogin()

    //@ts-ignore
    const errorMessage = error?.message

    return (
        <ModalForm
            title={'Login'}
            isModalOpen={props.isModalOpen}
            hideModal={props.hideModal}
            onSubmit={handleSubmit((data) => {
                login({
                    email: data.Email,
                    password: data.Password,
                })
                if (error) return
                reset({
                    Password: '',
                })
            })}
        >
            {/* Username */}
            <Controller
                control={control}
                name="Email"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                        id="Email"
                        label="Email"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        errorMessage={errors.Email && errors.Email?.message}
                        disabled={isLoading}
                    />
                )}
            />

            {/* Password */}
            <Controller
                control={control}
                name="Password"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                        id="Password"
                        label="Password"
                        type="password"
                        canRevealPassword
                        revealPasswordAriaLabel="Show password"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        disabled={isLoading}
                        errorMessage={
                            errors.Password && errors.Password?.message
                        }
                    />
                )}
            />

            {/* Error message */}
            {error ? (
                <MessageBar messageBarType={MessageBarType.warning}>
                    {errorMessage}
                </MessageBar>
            ) : null}

            {/* Button Group */}
            <div className={styles.buttonGroup}>
                {/* Signin Button */}
                <PrimaryButton text="Signin" type="submit" />
            </div>
        </ModalForm>
    )
}
