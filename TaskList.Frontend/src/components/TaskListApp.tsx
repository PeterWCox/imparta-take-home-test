import {
    DefaultButton,
    Persona,
    PersonaSize,
    PrimaryButton,
    Text,
} from '@fluentui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useTasks from '../hooks/tasks/useTasks'
import useUser from '../hooks/user/useUser'
import { Task } from '../models/Task'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { logout, setToken } from '../redux/slices/authSlice'
import { RootState } from '../redux/store'
import { TokenRepository_Cookie } from '../repositories/TokenRepository'
import { AddTask } from './AddTask/AddTask'
import { LoginModal } from './LoginModal/LoginModal'
import { NotLoggedIn } from './NotLoggedIn/NotLoggedIn'
import { RegisterModal } from './RegisterModal/RegisterModal'
import { TaskColumn as StatusColumn } from './TaskColumn/TaskColumn'
import styles from './TaskListApp.module.css'

export const TaskListApp = () => {
    //States
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
    const [isSigninModalOpen, setIsSigninModalOpen] = useState(false)

    //Redux
    const dispatch = useAppDispatch()
    const { user } = useAppSelector((state: RootState) => state.auth)

    //Hooks
    const navigate = useNavigate()

    //Effects
    useEffect(() => {
        //On init - Try and get cached token
        const tokenDetails = new TokenRepository_Cookie().getToken()
        if (!tokenDetails) {
            return
        }

        dispatch(setToken(tokenDetails))
    }, [])

    //Queries
    const [tasks] = useTasks()
    const [isUserLoading] = useUser()

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

            <div className={styles.wrapper}>
                <div className={styles.container}>
                    {/* Tasks */}
                    <div className={styles.tasks}>
                        <div className={styles.header}>
                            {/* Tasks List Name */}
                            <Text variant="xLargePlus">My Tasks</Text>

                            {/* CTAs */}
                            <div className={styles.ctas}>
                                {user ? (
                                    <>
                                        <Persona
                                            // imageInitials={UserUtils.getInitials(user.name)}
                                            text={user.email}
                                            secondaryText={user.username}
                                            size={PersonaSize.size72}
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
                        </div>

                        {/* Add Task */}
                        {user ? <AddTask /> : null}

                        {user ? (
                            <div className={styles.statusLists}>
                                <StatusColumn
                                    status={0}
                                    tasks={
                                        tasks?.filter(
                                            (t: Task) => t.status === 0
                                        ) ?? []
                                    }
                                    title={'Pending'}
                                />
                                <StatusColumn
                                    status={1}
                                    tasks={
                                        tasks?.filter(
                                            (t: Task) => t.status === 1
                                        ) ?? []
                                    }
                                    title={'In Progress'}
                                />
                                <StatusColumn
                                    status={2}
                                    tasks={
                                        tasks?.filter(
                                            (t: Task) => t.status === 2
                                        ) ?? []
                                    }
                                    title={'Completed'}
                                />
                            </div>
                        ) : null}

                        {!user && !isUserLoading ? <NotLoggedIn /> : null}
                    </div>
                </div>
            </div>
        </>
    )
}
