import {
    DefaultButton,
    Persona,
    PersonaSize,
    PrimaryButton,
    SearchBox,
    Text,
} from '@fluentui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StringParam, useQueryParam } from 'use-query-params'
import useTasks from '../hooks/tasks/useTasks'
import useGetUser from '../hooks/user/useUser'
import { Task } from '../models/Task'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { logout, setToken } from '../redux/slices/authSlice'
import { RootState } from '../redux/store'
import { TokenRepository_Cookie } from '../repositories/TokenRepository'
import { AddTask } from './AddTask/AddTask'
import { RegisterModal } from './RegisterModal/RegisterModal'
import { SigninModal } from './SigninModal/SigninModal'
import { TaskColumn } from './TaskColumn/TaskColumn'
import styles from './TaskListApp.module.css'

export const TaskListApp = () => {
    //QP's
    const [searchQuery, setSearchQuery] = useQueryParam('q', StringParam)

    //States
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
    const [isSigninModalOpen, setIsSigninModalOpen] = useState(false)

    //Redux
    const dispatch = useAppDispatch()
    const { user } = useAppSelector((state: RootState) => state.auth)

    //Hooks
    const navigate = useNavigate()

    useEffect(() => {
        //On init - Try and get cached token
        const token = new TokenRepository_Cookie().getToken()

        if (!token) {
            return
        }

        dispatch(setToken(token))
    }, [])

    //Queries
    const [tasks] = useTasks()
    const [userLoading] = useGetUser()

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
    const handleSearchboxChange = (_: any, newValue?: string) => {
        setSearchQuery(newValue)
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
                <SigninModal
                    isModalOpen={isSigninModalOpen}
                    hideModal={handleSignInModalClose}
                />
            ) : null}

            <div className={styles.wrapper}>
                <div className={styles.container}>
                    {/* Tasklist Panel */}
                    <div className={styles.leftPanel}>
                        {/* Register Button */}
                        {!user ? (
                            <PrimaryButton
                                text="Register"
                                onClick={handleRegisterButtonClick}
                            />
                        ) : null}

                        {/* Persona */}
                        {user ? (
                            <Persona
                                // imageInitials={UserUtils.getInitials(user.name)}
                                text={user.email}
                                secondaryText={user.username}
                                // tertiaryText={user.email}
                                size={PersonaSize.size72}
                                // imageAlt={user.name}
                            />
                        ) : null}

                        {/* Signin/Signout Button */}
                        {!user ? (
                            <DefaultButton
                                text="Sign in"
                                onClick={handleSigninButtonClick}
                            />
                        ) : (
                            <DefaultButton
                                text="Sign out"
                                onClick={handleSignoutButtonClick}
                            />
                        )}

                        {/* Searchbox */}
                        <div>
                            <SearchBox
                                placeholder="Search tasks..."
                                onChange={handleSearchboxChange}
                                showIcon
                                value={searchQuery ?? ''}
                            />
                        </div>
                    </div>

                    {/* Tasks */}
                    <div className={styles.tasks}>
                        {/* Tasks List Name */}
                        <Text variant="xLargePlus">Task List Name</Text>

                        <div className={styles.statusLists}>
                            <TaskColumn
                                status={0}
                                tasks={
                                    tasks?.filter(
                                        (t: Task) => t.status === 0
                                    ) ?? []
                                }
                            />
                            <TaskColumn
                                status={1}
                                tasks={
                                    tasks?.filter(
                                        (t: Task) => t.status === 1
                                    ) ?? []
                                }
                            />
                            <TaskColumn
                                status={2}
                                tasks={
                                    tasks?.filter(
                                        (t: Task) => t.status === 2
                                    ) ?? []
                                }
                            />
                        </div>

                        {/* Add Task */}
                        <AddTask />
                    </div>
                </div>
            </div>
        </>
    )
}
