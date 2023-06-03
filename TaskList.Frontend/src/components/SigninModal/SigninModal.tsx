import { MessageBar, MessageBarType, TextField } from '@fluentui/react'
import { PrimaryButton } from '@fluentui/react/lib/Button'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import useSignin from '../../hooks/user/useSignin'
import { ModalWrapper } from '../../lib/ModalWrapper/ModalWrapper'
import styles from './SigninModal.module.css'

export interface ISigninModalProps {
    isModalOpen: boolean
    hideModal: () => void
}

export const SigninModal = (props: ISigninModalProps) => {
    //States
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    //React-Hook-Form
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm()
    const [signin, error] = useSignin({
        username,
        password,
    })

    //@ts-ignore
    const errorMessage = error?.message

    return (
        <ModalWrapper
            title={'Signin'}
            isModalOpen={props.isModalOpen}
            hideModal={props.hideModal}
        >
            <form
                onSubmit={handleSubmit((data) => {
                    console.log(data)
                    console.log(errors)
                    setUsername(data.Username)
                    setPassword(data.Password)
                    signin()
                })}
            >
                {/* Username */}
                <Controller
                    control={control}
                    name="Username"
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextField
                            id="Username"
                            label="Username"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                            errorMessage={
                                errors.Username && 'Username is required'
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
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                            errorMessage={
                                errors.Password && 'Password is required'
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
                    />
                </div>
            </form>
        </ModalWrapper>
    )
}
