import {
    DefaultButton,
    Persona,
    PersonaSize,
    PrimaryButton,
    SearchBox,
    Text,
} from '@fluentui/react'
import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { logout, setToken, setUser } from '../redux/slices/authSlice'
import { RootState } from '../redux/store'
import { TokenRepository_Cookie } from '../repositories/TokenRepository'
import { AddTask } from './AddTask/AddTask'
import { RegisterModal } from './RegisterModal/RegisterModal'
import { SigninModal } from './SigninModal/SigninModal'
import { TaskColumn } from './TaskColumn/TaskColumn'
import styles from './TaskListApp.module.css'

export const TaskListApp = () => {
    //States
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
    const [isSigninModalOpen, setIsSigninModalOpen] = useState(false)

    //Redux
    const dispatch = useAppDispatch()
    const { token, user } = useAppSelector((state: RootState) => state.auth)

    useEffect(() => {
        //On init - Try and get cached token
        const token = new TokenRepository_Cookie().getToken()

        if (!token) {
            return
        }

        dispatch(setToken(token))
    }, [])

    //Queries
    const { data: tasks } = useQuery({
        queryKey: [token],
        queryFn: async () => {
            try {
                const response = await axios.get(
                    `http://localhost:24288/api/Tasks`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                if (response.data) {
                    dispatch(setUser(response.data))
                }

                return response.data
            } catch (error) {
                const errors = error as AxiosError
                console.log(errors)

                if (errors?.response?.status === 401) {
                    throw new Error('Invalid username or password')
                }

                throw new Error('An unknown error has occured')
            }
        },
        enabled: !!token,
    })

    const { isLoading: isUserLoading } = useQuery({
        queryKey: [token, 'tasks'],
        queryFn: async () => {
            try {
                const response = await axios.get(
                    `http://localhost:24288/api/Authentication/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                if (response.data) {
                    dispatch(setUser(response.data))
                }

                return response.data
            } catch (error) {
                const errors = error as AxiosError
                console.log(errors)

                if (errors?.response?.status === 401) {
                    throw new Error('Invalid username or password')
                }

                throw new Error('An unknown error has occured')
            }
        },
        enabled: !!token,
    })

    // const isLoading = isAuthLoading || isTasksLoading || isUserLoading

    //Effects

    //Handlers
    const handleSigninButtonClick = () => {
        setIsSigninModalOpen(true)
    }
    const handleRegisterButtonClick = () => {
        setIsRegisterModalOpen(true)
    }
    const handleSignoutButtonClick = () => {
        dispatch(logout())
    }
    const handleSignInModalClose = () => {
        setIsSigninModalOpen(false)
    }
    const handleRegisterModalClose = () => {
        setIsRegisterModalOpen(false)
    }

    console.log(user?.username)

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
                                placeholder="Search"
                                onSearch={(newValue) =>
                                    console.log('value is ' + newValue)
                                }
                                showIcon
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
                                    tasks?.filter((t) => t.status === 0) ?? []
                                }
                            />
                            <TaskColumn
                                status={1}
                                tasks={
                                    tasks?.filter((t) => t.status === 1) ?? []
                                }
                            />
                            <TaskColumn
                                status={2}
                                tasks={
                                    tasks?.filter((t) => t.status === 2) ?? []
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
