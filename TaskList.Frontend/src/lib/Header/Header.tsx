import {
    DefaultButton,
    Persona,
    PersonaSize,
    PrimaryButton,
    Text,
} from '@fluentui/react'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginModal } from '../../components/LoginModal/LoginModal'
import { RegisterModal } from '../../components/RegisterModal/RegisterModal'
import useUser from '../../hooks/user/useUser'
import { useAppDispatch } from '../../redux/hooks'
import { logout } from '../../redux/slices/authSlice'
import styles from './Header.module.css'

export const Header = () => {
    //Redux
    const dispatch = useAppDispatch()

    //States
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
    const [isSigninModalOpen, setIsSigninModalOpen] = useState(false)

    //Hooks
    const navigate = useNavigate()
    const [user] = useUser()

    //Handlers
    const handleSigninButtonClick = () => {
        setIsSigninModalOpen(true)
    }
    const handleRegisterButtonClick = () => {
        setIsRegisterModalOpen(true)
    }
    const handleSignoutButtonClick = () => {
        dispatch(logout())
        navigate(0)
    }
    const handleSignInModalClose = () => {
        setIsSigninModalOpen(false)
    }
    const handleRegisterModalClose = () => {
        setIsRegisterModalOpen(false)
    }

    return (
        <>
            {/* Register Modal */}
            {isRegisterModalOpen ? (
                <RegisterModal
                    isModalOpen={isRegisterModalOpen}
                    hideModal={handleRegisterModalClose}
                />
            ) : null}

            {/* Signin Modal */}
            {isSigninModalOpen ? (
                <LoginModal
                    isModalOpen={isSigninModalOpen}
                    hideModal={handleSignInModalClose}
                />
            ) : null}

            <header>
                <nav className={styles.container}>
                    <div className={styles.left}>
                        <Text variant="xxLarge">Task List</Text>
                    </div>

                    <div className={styles.right}>
                        {user ? (
                            <>
                                <Persona
                                    text={user.email}
                                    secondaryText={user.username}
                                    size={PersonaSize.size32}
                                    imageAlt={user.username}
                                />
                                <DefaultButton
                                    text="Sign out"
                                    onClick={handleSignoutButtonClick}
                                />
                            </>
                        ) : (
                            <>
                                <PrimaryButton
                                    text="Register"
                                    onClick={handleRegisterButtonClick}
                                />
                                <DefaultButton
                                    text="Sign in"
                                    onClick={handleSigninButtonClick}
                                />
                            </>
                        )}
                    </div>
                </nav>
            </header>
        </>
    )
}
