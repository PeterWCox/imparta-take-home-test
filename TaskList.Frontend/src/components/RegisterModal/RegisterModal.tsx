import { TextField } from '@fluentui/react'
import { PrimaryButton } from '@fluentui/react/lib/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import useRegister from '../../hooks/user/useRegister'
import { ModalForm } from '../../lib/ModalForm/ModalForm'
import { RegistrationRequest } from '../../models/User'
import styles from './RegisterModal.module.css'

const validationSchema = z
    .object({
        Username: z.string().min(1, { message: 'Username is required' }),
        Password: z.string().min(1, { message: 'Password is required' }),
        Email: z.string().min(1, { message: 'Email is required' }).email({
            message: 'Must be a valid email',
        }),
        ConfirmPassword: z
            .string()
            .min(6, { message: 'Password must be atleast 6 characters' }),
    })
    .refine((data) => data.Password === data.ConfirmPassword, {
        path: ['ConfirmPassword'],
        message: "Passwords don't match",
    })

type ValidationSchema = z.infer<typeof validationSchema>

export interface IRegisterModalProps {
    isModalOpen: boolean
    hideModal: () => void
}

export const RegisterModal = (props: IRegisterModalProps) => {
    //States
    const [registrationRequest, setRegistrationRequest] =
        useState<RegistrationRequest | null>(null)

    //React-Hook-Form
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ValidationSchema>({
        resolver: zodResolver(validationSchema),
    })

    //Mutations
    const [register] = useRegister(registrationRequest)

    return (
        <ModalForm
            title={'Register'}
            isModalOpen={props.isModalOpen}
            hideModal={props.hideModal}
            onSubmit={handleSubmit((data) => {
                setRegistrationRequest({
                    username: data.Username,
                    password: data.Password,
                    email: data.Email,
                })
                register()
            })}
        >
            {/* Username */}
            <Controller
                control={control}
                name="Username"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                        id="Username"
                        label="Username"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        errorMessage={
                            errors.Username && errors.Username?.message
                        }
                    />
                )}
            />

            {/* Email */}
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
                        errorMessage={
                            errors.Password && errors.Password?.message
                        }
                    />
                )}
            />

            {/* Confirm password */}
            <Controller
                control={control}
                name="ConfirmPassword"
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
                            errors.ConfirmPassword &&
                            errors.ConfirmPassword?.message
                        }
                    />
                )}
            />

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
