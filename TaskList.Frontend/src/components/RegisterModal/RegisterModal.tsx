import { MessageBar, MessageBarType, TextField } from '@fluentui/react'
import { PrimaryButton } from '@fluentui/react/lib/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import useRegister from '../../hooks/user/useRegister'
import { ModalForm } from '../../lib/ModalForm/ModalForm'
import styles from './RegisterModal.module.css'

const validationSchema = z
    .object({
        username: z.string().min(1, { message: 'Username is required' }),
        email: z.string().min(1, { message: 'Email is required' }).email({
            message: 'Must be a valid email',
        }),
        password: z
            .string()
            .min(6, { message: 'Password must be atleast 6 characters' }),
        confirmPassword: z
            .string()
            .min(6, { message: 'Password must be atleast 6 characters' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['ConfirmPassword'],
        message: "Passwords don't match",
    })

type ValidationSchema = z.infer<typeof validationSchema>

export interface IRegisterModalProps {
    isModalOpen: boolean
    hideModal: () => void
}

export const RegisterModal = (props: IRegisterModalProps) => {
    //React-Hook-Form
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<ValidationSchema>({
        resolver: zodResolver(validationSchema),
    })

    //Mutations
    const [register, isLoading, error] = useRegister()

    //@ts-ignore
    const errorMessage = error?.message

    return (
        <ModalForm
            title={'Register'}
            isModalOpen={props.isModalOpen}
            hideModal={props.hideModal}
            onSubmit={handleSubmit((data) => {
                register({
                    username: data.username,
                    password: data.password,
                    email: data.email,
                })
                if (!error) {
                    reset({
                        username: '',
                    })
                }
            })}
        >
            {/* Username */}
            <Controller
                control={control}
                name="username"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                        id="Username"
                        label="Username"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        disabled={isLoading as boolean}
                        errorMessage={
                            errors.username && errors.username?.message
                        }
                    />
                )}
            />

            {/* Email */}
            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                        id="Email"
                        label="Email"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        disabled={isLoading as boolean}
                        errorMessage={errors.email && errors.email?.message}
                    />
                )}
            />

            {/* Password */}
            <Controller
                control={control}
                name="password"
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
                        errorMessage={
                            errors.password && errors.password?.message
                        }
                    />
                )}
            />

            {/* Confirm password */}
            <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                        id="ConfirmPassword"
                        label="ConfirmPassword"
                        type="password"
                        canRevealPassword
                        revealPasswordAriaLabel="Show password"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        errorMessage={
                            errors.confirmPassword &&
                            errors.confirmPassword?.message
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
                <PrimaryButton
                    text="Register"
                    type="submit"
                    disabled={Object.keys(errors).length > 0}
                />
            </div>
        </ModalForm>
    )
}
