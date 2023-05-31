import {
    DefaultButton,
    Icon,
    Panel,
    Persona,
    PersonaSize,
    PrimaryButton,
    SearchBox,
    Text,
} from '@fluentui/react'
import { TaskCard } from '../TaskCard/TaskCard'
import React from 'react'

export interface ITaskStatusListProps {
    title: string
}

export const TaskStatusList = (props: ITaskStatusListProps) => {
    const [showCompletedTasks, setShowCompletedTasks] = React.useState(true)

    return (
        <div
            style={{
                width: '33%',
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 30,
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
            }}
        >
            <Text variant="xLarge">{props.title}</Text>

            <div
                className="tasksContainer"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20,
                    overflowX: 'hidden',
                    padding: 20,
                }}
            >
                {/* Incomplete tasks */}
                <div
                    className="tasks"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                    }}
                >
                    <TaskCard />
                    <TaskCard />
                    <TaskCard />
                    <TaskCard />
                    <TaskCard />
                    <TaskCard />
                    <TaskCard />
                    <TaskCard />
                    <TaskCard />
                    <TaskCard />
                    <TaskCard />
                    <TaskCard />
                </div>

                {/* Show completed tasks */}
                <PrimaryButton
                    text="Completed (5)"
                    styles={{
                        root: {
                            padding: 10,
                            width: 'fit-content',
                        },
                    }}
                    onClick={() => setShowCompletedTasks(!showCompletedTasks)}
                    iconProps={{
                        iconName: showCompletedTasks
                            ? 'ChevronDown'
                            : 'ChevronRight',
                    }}
                />

                {/* Complete Tasks */}
                {showCompletedTasks ? (
                    <div
                        className="tasks"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                    </div>
                ) : null}
            </div>
        </div>
    )
}
