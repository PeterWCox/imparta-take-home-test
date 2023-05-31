import { Text } from '@fluentui/react'
import React from 'react'
import { ShowCompletedTasks } from '../ShowCompletedTasks/ShowCompletedTasks'
import { Task } from '../../models/Task'
import { TaskList } from '../TaskList/TaskList'
import styles from './TaskColumn.module.css'

export interface ITaskColumnProps {
    title: string
}

const tasks: Task[] = [
    {
        id: 1,
        title: 'Task 1',
        isDone: false,
        status: 'Completed',
    },
    {
        id: 2,
        title: 'Task 2',
        isDone: false,
        status: 'Completed',
    },
    {
        id: 3,
        title: 'Task 3',
        isDone: true,
        status: 'Completed',
    },
]

export const TaskColumn = (props: ITaskColumnProps) => {
    const [showCompletedTasks, setShowCompletedTasks] = React.useState(true)

    return (
        <div className={styles.taskColumn}>
            {/* Status Title */}
            <Text variant="xLarge">{props.title}</Text>

            <div className={styles.tasksColumnContainer}>
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
