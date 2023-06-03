import { MessageBar, MessageBarType, TextField } from '@fluentui/react'
import { PrimaryButton } from '@fluentui/react/lib/Button'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { ModalWrapper } from '../../lib/ModalWrapper/ModalWrapper'
import { LoginRequest } from '../../models/User'
import { useAppDispatch } from '../../redux/hooks'
import { setToken } from '../../redux/slices/authSlice'
import styles from './SigninModal.module.css'

export interface ISigninModalProps {
    isModalOpen: boolean
    hideModal: () => void
}

export interface ILoginRequest {
    username: string
    password: string
}

export const SigninModal = (props: ISigninModalProps) => {
    //States
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    //Hooks
    const dispatch = useAppDispatch()

    //Handlers
    const handleUsernameChange = (_: any, newValue?: string) => {
        setUsername(newValue || '')
    }
    const handlePasswordChange = (_: any, newValue?: string) => {
        setPassword(newValue || '')
    }

    //Mutations
    const { mutateAsync: signin, error } = useMutation([username, password], {
        mutationFn: async (loginRequest: LoginRequest) => {
            try {
                const response = await axios.post(
                    `http://localhost:24288/api/Authentication/Login`,
                    loginRequest
                )

                //Set token if successful
                if (response.data?.token) {
                    dispatch(setToken(response.data.token))
                }

                props.hideModal()
            } catch (error) {
                const errors = error as AxiosError

                if (errors?.response?.status === 401) {
                    throw new Error('Invalid username or password')
                }

                throw new Error('An unknown error has occured')
            }
        },
    })

    console.log(error)

    //@ts-ignore
    const errorMessage = error?.message

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
                    {errorMessage}
                </MessageBar>
            ) : null}

            {/* Button Group */}
            <div className={styles.buttonGroup}>
                {/* Signin Button */}
                <PrimaryButton
                    text="Signin"
                    onClick={() => signin({ username, password })}
                    allowDisabledFocus
                />
            </div>
        </ModalWrapper>
    )
}
