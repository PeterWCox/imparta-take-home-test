import { TextField } from '@fluentui/react'
import { PrimaryButton } from '@fluentui/react/lib/Button'
import { useState } from 'react'
import { ModalWrapper } from '../../lib/ModalWrapper/ModalWrapper'
import { useAppDispatch } from '../../redux/hooks'
import styles from './RegisterModal.module.css'

export interface IRegisterModalProps {
    isModalOpen: boolean
    hideModal: () => void
}

export const RegisterModal = (props: IRegisterModalProps) => {
    //States
    const [username, setUsername] = useState('')
    const [emailAdress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')

    //Handlers
    const dispatch = useAppDispatch()
    // const handleRegisterButtonClick = () => {
    //     dispatch(
    //         thunkLogin({
    //             username,
    //             password,
    //         })
    //     )
    //     if (!error) {
    //         dispatch(thunkGetTasks(token!))
    //         props.hideModal()
    //     }
    // }

    return (
        <ModalWrapper
            title={'Register'}
            isModalOpen={props.isModalOpen}
            hideModal={props.hideModal}
        >
            {/* Username */}
            <TextField
                label="Username"
                errorMessage="Error message"
                value={username}
                onChange={(_, newValue?: string) => {
                    setUsername(newValue || '')
                }}
            />

            {/* Email address */}
            <TextField
                label="Password"
                errorMessage="Error message"
                value={emailAdress}
                onChange={(_, newValue?: string) => {
                    setEmailAddress(newValue || '')
                }}
            />

            {/* Password */}
            <TextField
                label="Password"
                errorMessage="Error message"
                value={password}
                onChange={(_, newValue?: string) => {
                    setPassword(newValue || '')
                }}
            />

            {/* Button Group */}
            <div className={styles.buttonGroup}>
                <PrimaryButton
                    text="Register"
                    // onClick={_alertClicked}
                    allowDisabledFocus
                    // disabled={disabled}
                    // checked={checked}
                />
            </div>
        </ModalWrapper>
    )
}
