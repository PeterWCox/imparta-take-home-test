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
import { ShowCompletedTasks } from '../ShowCompletedTasks/ShowCompletedTasks'
import { Task } from '../../models/Task'
import { TaskList } from '../TaskList/TaskList'

export interface ITaskStatusListProps {
    title: string
}

const tasks: Task[] = [
    {
        id: 1,
        title: 'Task 1',
        isDone: false,
        status: 'In Progress',
    },
    {
        id: 2,
        title: 'Task 2',
        isDone: false,
        status: 'In Progress',
    },
    {
        id: 3,
        title: 'Task 3',
        isDone: true,
        status: 'In Progress',
    },
]

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
                <TaskList tasks={tasks.filter((t) => !t.isDone)} />

                {/* Show completed tasks */}
                <ShowCompletedTasks
                    count={5}
                    showCompletedTasks={showCompletedTasks}
                    onClick={() => setShowCompletedTasks(!showCompletedTasks)}
                />

                {/* Complete Tasks */}
                <TaskList tasks={tasks.filter((t) => t.isDone)} />
            </div>
        </div>
    )
}
