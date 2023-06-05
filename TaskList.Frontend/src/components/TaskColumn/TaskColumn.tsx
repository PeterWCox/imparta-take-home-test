import { Text } from '@fluentui/react'
import { useState } from 'react'
import { Status, Task } from '../../models/Task'
import { ShowCompletedTasks } from '../ShowCompletedTasks/ShowCompletedTasks'
import { TaskList } from '../TaskList/TaskList'
import styles from './TaskColumn.module.css'

export interface ITaskColumnProps {
    title: string
    tasks: Task[]
    status: Status
}

export const TaskColumn = (props: ITaskColumnProps) => {
    //States
    const [showCompletedTasks, setShowCompletedTasks] = useState(true)

    const incompleteTasks = props.tasks.filter((t: Task) => !t.isDone) || []
    const completedTasks = props.tasks.filter((t: Task) => t.isDone) || []

    return (
        <div className={styles.taskColumn}>
            {/* Status Title */}
            <Text variant="xLarge">{`${props.title} (${
                props.tasks.filter((t) => !t.isDone).length
            })`}</Text>

            <div className={styles.tasksColumnContainer}>
                {/* Incomplete tasks */}
                <TaskList tasks={incompleteTasks} />

                {/* {isLoading
                    ? [...Array(5)].map((_, i) => <TaskCardLoading />)
                    : null} */}

                {/* Show completed tasks */}
                {completedTasks.length > 0 ? (
                    <ShowCompletedTasks
                        count={completedTasks.length}
                        showCompletedTasks={showCompletedTasks}
                        onClick={() =>
                            setShowCompletedTasks(!showCompletedTasks)
                        }
                    />
                ) : null}

                {/* Complete Tasks */}
                {showCompletedTasks ? (
                    <TaskList tasks={incompleteTasks} />
                ) : null}
            </div>
        </div>
    )
}
