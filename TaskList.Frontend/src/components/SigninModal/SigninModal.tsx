import { MessageBar, MessageBarType, TextField } from '@fluentui/react'
import { PrimaryButton } from '@fluentui/react/lib/Button'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import useSignin from '../../hooks/user/useSignin'
import { ModalWrapper } from '../../lib/ModalWrapper/ModalWrapper'
import { useAppSelector } from '../../redux/hooks'
import styles from './SigninModal.module.css'

export interface ISigninModalProps {
    isModalOpen: boolean
    hideModal: () => void
}

export const SigninModal = (props: ISigninModalProps) => {
    //States
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    //Hooks
    const { user } = useAppSelector((state) => state.auth)
    const { handleSubmit, control } = useForm()
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
                    setUsername(data.Username)
                    setPassword(data.Password)
                    signin()
                    if (user) {
                        props.hideModal()
                    }
                })}
            >
                {/* Username */}
                <Controller
                    control={control}
                    name="Username"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextField
                            label="Username"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                        />
                    )}
                />

                {/* Password */}
                <Controller
                    control={control}
                    name="Password"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextField
                            label="Password"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                        />
                    )}
                />

                {/* Error message */}
                {error ? (
                    <MessageBar messageBarType={MessageBarType.error}>
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
