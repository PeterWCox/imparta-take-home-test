import {
    DefaultButton,
    Persona,
    PersonaSize,
    PrimaryButton,
    SearchBox,
    Text,
} from '@fluentui/react'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { thunkGetTasks } from '../redux/slices/tasksSlice'
import { RootState } from '../redux/store'
import { UserUtils } from '../utils/UserUtils'
import { AddTask } from './AddTask/AddTask'
import { RegisterModal } from './Register/Register'
import { SigninModal } from './SigninModal/SigninModal'
import { TaskColumn } from './TaskColumn/TaskColumn'
import styles from './TaskListApp.module.css'

export const TaskListApp = () => {
    //States
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
    const [isSigninModalOpen, setIsSigninModalOpen] = useState(false)

    //Hooks
    const dispatch = useAppDispatch()
    const { isLoading, error, user, tasks } = useAppSelector(
        (state: RootState) => state.tasks
    )

    //Effects
    useEffect(() => {
        //Get tasks from API
        dispatch(thunkGetTasks())
    }, [])

    //Handlers
    const handleSigninButtonClick = () => {
        setIsSigninModalOpen(true)
    }
    const handleRegisterButtonClick = () => {
        setIsRegisterModalOpen(true)
    }

    const handleSignInModalClose = () => {
        setIsSigninModalOpen(false)
    }
    const handleRegisterModalClose = () => {
        setIsRegisterModalOpen(false)
    }

    console.log(error)

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

                        {/* Signin Button */}
                        {!user ? (
                            <DefaultButton
                                text="Sign in"
                                onClick={handleSigninButtonClick}
                            />
                        ) : null}

                        {/* Persona */}
                        {user ? (
                            <Persona
                                imageInitials={UserUtils.getInitials(user.name)}
                                text={user.name}
                                secondaryText={user.email}
                                size={PersonaSize.size56}
                                imageAlt={user.name}
                            />
                        ) : null}

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
