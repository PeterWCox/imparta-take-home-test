import {
    DefaultButton,
    Persona,
    PersonaSize,
    PrimaryButton,
    SearchBox,
    Text,
} from '@fluentui/react'
import { useState } from 'react'
import { AddTask } from './AddTask/AddTask'
import { RegisterModal } from './Register/Register'
import { TaskColumn } from './TaskColumn/TaskColumn'
import styles from './TaskListApp.module.css'

export const TaskListApp = () => {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

    return (
        <>
            <RegisterModal
                isModalOpen={isRegisterModalOpen}
                hideModal={() => setIsRegisterModalOpen(false)}
            />
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    {/* Tasklist Panel */}
                    <div className={styles.leftPanel}>
                        {/* Register Button */}
                        <PrimaryButton
                            text="Register"
                            onClick={() => setIsRegisterModalOpen(true)}
                        />

                        {/* Login Button */}
                        <DefaultButton text="Login" />

                        {/* Logged in status */}
                        <Persona
                            imageInitials={'PC'}
                            text={'Peter Cox'}
                            secondaryText={'Software Engineer'}
                            tertiaryText={'In a meeting'}
                            optionalText={'Available at 4:00pm'}
                            size={PersonaSize.size56}
                            imageAlt="Annie Lindqvist, status is away"
                        />

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
                            <TaskColumn status="Pending" />
                            <TaskColumn status="In progresss" />
                            <TaskColumn status="Completed" />
                        </div>

                        {/* Add Task */}
                        <AddTask />
                    </div>
                </div>
            </div>
        </>
    )
}
