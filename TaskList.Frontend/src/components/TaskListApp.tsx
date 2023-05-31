import {
    Icon,
    Panel,
    Persona,
    PersonaSize,
    SearchBox,
    Text,
} from '@fluentui/react'
import { useState } from 'react'
import { TaskColumn } from './TaskColumn/TaskColumn'
import { AddTask } from './AddTask/AddTask'
import { RegisterModal } from './Register/Register'

export const TaskListApp = () => {
    const [isPanelOpen, setIsPanelOpen] = useState(false)
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

    return (
        <>
            <RegisterModal
                isModalOpen={isRegisterModalOpen}
                hideModal={() => setIsRegisterModalOpen(false)}
            />
            <div
                className="wrapper"
                style={{
                    backgroundColor: 'red',
                    height: '100vh',
                    // display: 'flex',
                    // justifyContent: 'center',
                    // alignItems: 'center',
                }}
            >
                <div
                    className="container"
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        height: '100%',
                    }}
                >
                    {/* Tasklist Panel */}
                    <div
                        style={{
                            margin: '20 20 20 0',
                            backgroundColor: 'white',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: 20,
                            gap: 20,
                        }}
                    >
                        {/* Logged in status */}
                        <Persona
                            imageInitials={'AL'}
                            text={'Peter Cox'}
                            secondaryText={'Software Engineer'}
                            tertiaryText={'In a meeting'}
                            optionalText={'Available at 4:00pm'}
                            size={PersonaSize.size40}
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
                    <div
                        className="tasks-container"
                        style={{
                            margin: '20 20 20 0',
                            padding: 20,
                            backgroundColor: 'yellow',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 25,
                        }}
                    >
                        <Text variant="xLargePlus">Task List Name</Text>
                        <div
                            className="tasks-list-container"
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <TaskColumn title="Pending" />
                            <TaskColumn title="In progress" />
                            <TaskColumn title="Completed" />
                        </div>

                        {/* Add Task */}
                        <AddTask />
                    </div>
                </div>
            </div>
            <Panel
                headerText="Sample panel"
                isOpen={isPanelOpen}
                closeButtonAriaLabel="Close"
                onDismiss={() => setIsPanelOpen(false)}
            >
                <p>Content goes here.</p>
            </Panel>
        </>
    )
}
