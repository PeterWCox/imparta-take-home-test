import { TextField } from '@fluentui/react'
import { PrimaryButton } from '@fluentui/react/lib/Button'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import useRegister from '../../hooks/user/useRegister'
import { ModalWrapper } from '../../lib/ModalWrapper/ModalWrapper'
import { RegistrationRequest } from '../../models/User'
import { ValidationUtils } from '../../utils/ValidationUtils'
import styles from './RegisterModal.module.css'

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
    } = useForm()

    //Mutations
    const [register, error] = useRegister(registrationRequest)

    //Get keys from 'errors'
    const errorKeys = Object.keys(errors)

    console.log(errors)

    return (
        <ModalWrapper
            title={'Register'}
            isModalOpen={props.isModalOpen}
            hideModal={props.hideModal}
        >
            <form
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
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextField
                            id="Username"
                            label="Username"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                            errorMessage={
                                errors.Username &&
                                ValidationUtils.getValidationRequiredMessage(
                                    'Username'
                                )
                            }
                        />
                    )}
                />

                {/* Email */}
                <Controller
                    control={control}
                    name="Email"
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextField
                            id="Email"
                            label="Email"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                            errorMessage={
                                errors.Email &&
                                ValidationUtils.getValidationRequiredMessage(
                                    'Email'
                                )
                            }
                        />
                    )}
                />

                {/* Password */}
                <Controller
                    control={control}
                    name="Password"
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextField
                            id="Password"
                            label="Password"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                            errorMessage={
                                errors.Password &&
                                ValidationUtils.getValidationRequiredMessage(
                                    'Password'
                                )
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
            </form>
        </ModalWrapper>
    )
}
