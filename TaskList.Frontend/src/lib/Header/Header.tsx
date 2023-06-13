import {
    DefaultButton,
    Persona,
    PersonaSize,
    PrimaryButton,
    Text,
} from '@fluentui/react'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AddTaskListModal } from '../../components/Modals/AddTaskListModal/AddTaskListModal'
import { EditTaskListModal } from '../../components/Modals/EditTaskListModal.tsx/EditTaskListModal'
import { LoginModal } from '../../components/Modals/LoginModal/LoginModal'
import { RegisterModal } from '../../components/Modals/RegisterModal/RegisterModal'
import useUser from '../../hooks/user/useUser'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { logout } from '../../redux/slices/authSlice'
import { TaskListDropdown } from '../TasklistDropdown/TaskListDropdown'
import styles from './Header.module.css'

export const Header = () => {
    //Redux
    const dispatch = useAppDispatch()
    const { selectedTaskList } = useAppSelector((state) => state.taskList)

    //States
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
    const [isSigninModalOpen, setIsSigninModalOpen] = useState(false)
    const [isEditTaskListModalOpen, setIsTaskListModalOpen] = useState(false)
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)

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
    const handleAddTaskModalClose = () => {
        setIsAddTaskModalOpen(false)
    }
    const handleEditTaskListModalClose = () => {
        setIsTaskListModalOpen(false)
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

            {/* Add TaskLists Modal */}
            {isAddTaskModalOpen ? (
                <AddTaskListModal
                    isModalOpen={isAddTaskModalOpen}
                    hideModal={handleAddTaskModalClose}
                />
            ) : null}

            {/* EditTaskLists Modal */}
            {isEditTaskListModalOpen ? (
                <EditTaskListModal
                    isModalOpen={isEditTaskListModalOpen}
                    hideModal={handleEditTaskListModalClose}
                />
            ) : null}

            <header className={styles.wrapper}>
                <nav className={styles.container}>
                    <div className={styles.left}>
                        {/* Logo */}
                        <Text variant="xxLarge">PETE_TODO</Text>

                        {/* Add Task List Button */}
                        {user ? (
                            <PrimaryButton
                                onClick={() => setIsAddTaskModalOpen(true)}
                            >
                                Add Task List
                            </PrimaryButton>
                        ) : null}

                        {/* Edit Task List Button */}
                        {user && selectedTaskList ? (
                            <DefaultButton
                                onClick={() => setIsTaskListModalOpen(true)}
                                disabled={!selectedTaskList}
                            >
                                Edit Task List
                            </DefaultButton>
                        ) : null}
                    </div>

                    <div className={styles.right}>
                        {user ? (
                            <>
                                {/* Tasklist Dropdown */}
                                <TaskListDropdown />

                                {/* Logged in Persona */}
                                <Persona
                                    text={user.email}
                                    secondaryText={user.username}
                                    size={PersonaSize.size32}
                                    imageAlt={user.username}
                                />

                                {/* Signin Button */}
                                <DefaultButton
                                    text="Sign out"
                                    onClick={handleSignoutButtonClick}
                                />
                            </>
                        ) : (
                            <>
                                {/* Register Button */}
                                <PrimaryButton
                                    text="Register"
                                    onClick={handleRegisterButtonClick}
                                />

                                {/* Sign in button  */}
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
