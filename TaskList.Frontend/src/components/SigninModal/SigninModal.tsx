import { MessageBar, MessageBarType, TextField } from '@fluentui/react'
import { PrimaryButton } from '@fluentui/react/lib/Button'
import { useState } from 'react'
import { ModalWrapper } from '../../lib/ModalWrapper/ModalWrapper'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { thunkLogin } from '../../redux/slices/authSlice'
import { thunkGetTasks } from '../../redux/slices/tasksSlice'
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
    const dispatch = useAppDispatch()
    const { error } = useAppSelector((state) => state.tasks)
    const { token } = useAppSelector((state) => state.auth)

    //Handlers
    const handleUsernameChange = (_: any, newValue?: string) => {
        setUsername(newValue || '')
    }
    const handlePasswordChange = (_: any, newValue?: string) => {
        setPassword(newValue || '')
    }

    const handleSigninButtonClick = () => {
        dispatch(
            thunkLogin({
                username,
                password,
            })
        )
        if (!error) {
            dispatch(thunkGetTasks(token!))
            props.hideModal()
        }
    }

    return (
        <ModalWrapper
            title={'Signin'}
            isModalOpen={props.isModalOpen}
            hideModal={props.hideModal}
        >
            {/* Username */}
            <TextField label="Username" onChange={handleUsernameChange} />

            {/* Password */}
            <TextField
                label="Password"
                type="password"
                canRevealPassword
                revealPasswordAriaLabel="Show password"
                onChange={handlePasswordChange}
            />

            {/* Error message */}
            {error ? (
                <MessageBar messageBarType={MessageBarType.error}>
                    {error}
                </MessageBar>
            ) : null}

            {/* Button Group */}
            <div className={styles.buttonGroup}>
                {/* Signin Button */}
                <PrimaryButton
                    text="Signin"
                    onClick={handleSigninButtonClick}
                    allowDisabledFocus
                />
            </div>
        </ModalWrapper>
    )
}
