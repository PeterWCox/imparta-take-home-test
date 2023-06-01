import { TextField } from '@fluentui/react'
import { PrimaryButton } from '@fluentui/react/lib/Button'
import { useState } from 'react'
import { ModalWrapper } from '../../lib/ModalWrapper/ModalWrapper'
import styles from './RegisterModal.module.css'

export interface IRegisterModalProps {
    isModalOpen: boolean
    hideModal: () => void
}

export const RegisterModal = (props: IRegisterModalProps) => {
    const userName = useState('')
    const emailAdress = useState('')
    const password = useState('')

    return (
        <ModalWrapper
            title={'Register'}
            isModalOpen={props.isModalOpen}
            hideModal={props.hideModal}
        >
            {/* Username */}
            <TextField label="Username" errorMessage="Error message" />

            {/* Email address */}
            <TextField label="Password" errorMessage="Error message" />

            {/* Button Group */}
            <div className={styles.buttonGroup}>
                <PrimaryButton
                    text="Submit"
                    // onClick={_alertClicked}
                    allowDisabledFocus
                    // disabled={disabled}
                    // checked={checked}
                />
            </div>
        </ModalWrapper>
    )
}
