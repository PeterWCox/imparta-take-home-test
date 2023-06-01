import { Text } from '@fluentui/react'
import { useState } from 'react'
import { Status, Task } from '../../models/Task'
import { useAppSelector } from '../../redux/hooks'
import { ShowCompletedTasks } from '../ShowCompletedTasks/ShowCompletedTasks'
import { TaskList } from '../TaskList/TaskList'
import styles from './TaskColumn.module.css'

export interface ITaskColumnProps {
    tasks: Task[]
    status: Status
}

export const TaskColumn = (props: ITaskColumnProps) => {
    //States
    const [showCompletedTasks, setShowCompletedTasks] = useState(true)

    //Hooks
    const tasksByStatus = useAppSelector((state) =>
        state.tasks.tasks.filter((t: any) => t.status === props.status)
    )
    const incompleteTasks = tasksByStatus.filter((t: Task) => !t.isDone) || []
    const completedTasks = tasksByStatus.filter((t: Task) => t.isDone) || []

    return (
        <div className={styles.taskColumn}>
            {/* Status Title */}
            <Text variant="xLarge">{`${props.status} (${incompleteTasks.length})`}</Text>

            <div className={styles.tasksColumnContainer}>
                {/* Incomplete tasks */}
                <TaskList
                    tasks={tasksByStatus.filter((t: Task) => !t.isDone)}
                />

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
                    <TaskList
                        tasks={tasksByStatus.filter((t: Task) => t.isDone)}
                    />
                ) : null}
            </div>
        </div>
    )
}
