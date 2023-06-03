import { MessageBar, MessageBarType, TextField } from '@fluentui/react'
import { PrimaryButton } from '@fluentui/react/lib/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import useSignin from '../../hooks/user/useSignin'
import { ModalForm } from '../../lib/ModalForm/ModalForm'
import styles from './SigninModal.module.css'

export interface ISigninModalProps {
    isModalOpen: boolean
    hideModal: () => void
}

const validationSchema = z.object({
    Username: z.string().min(1, { message: 'Username is required' }),
    Password: z.string().min(1, { message: 'Password is required' }),
})

type ValidationSchema = z.infer<typeof validationSchema>

export const SigninModal = (props: ISigninModalProps) => {
    //States
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    //React-Hook-Form
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ValidationSchema>({
        resolver: zodResolver(validationSchema),
    })

    const [signin, error] = useSignin({
        username,
        password,
    })

    //@ts-ignore
    const errorMessage = error?.message

    return (
        <ModalForm
            title={'Signin'}
            isModalOpen={props.isModalOpen}
            hideModal={props.hideModal}
            onSubmit={handleSubmit((data) => {
                setUsername(data.Username)
                setPassword(data.Password)
                signin()
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

            {/* Error message */}
            {error ? (
                <MessageBar messageBarType={MessageBarType.info}>
                    {errorMessage}
                </MessageBar>
            ) : null}

            {/* Button Group */}
            <div className={styles.buttonGroup}>
                {/* Signin Button */}
                <PrimaryButton
                    text="Signin"
                    allowDisabledFocus
                    type="submit"
                    disabled={Object.keys(errors).length > 0}
                />
            </div>
        </ModalForm>
    )
}
