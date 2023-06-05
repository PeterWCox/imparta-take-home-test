import { useState } from 'react'
import { Status } from '../../enums/Enums'
import { Accordion } from '../../lib/Accordion/Accordion'
import { Task } from '../../models/Task'
import { AddTask } from '../AddTask/AddTask'
import { ShowCompletedTasks } from '../ShowCompletedTasks/ShowCompletedTasks'
import { TaskList } from '../TaskList/TaskList'

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

    const title =
        props.tasks.filter((t) => !t.isDone).length > 0
            ? `${props.title} (${props.tasks.filter((t) => !t.isDone).length})`
            : props.title

    return (
        <Accordion title={title}>
            {/* Add Task */}
            <AddTask status={props.status} />

            {/* Incomplete tasks */}
            {incompleteTasks?.length > 0 ? (
                <TaskList tasks={incompleteTasks} />
            ) : null}

            {/* {isLoading
                    ? [...Array(5)].map((_, i) => <TaskCardLoading />)
                    : null} */}

            {/* Show completed tasks */}
            {completedTasks.length > 0 ? (
                <ShowCompletedTasks
                    count={completedTasks.length}
                    showCompletedTasks={showCompletedTasks}
                    onClick={() => setShowCompletedTasks(!showCompletedTasks)}
                />
            ) : null}

            {/* Complete Tasks */}
            {showCompletedTasks ? <TaskList tasks={completedTasks} /> : null}
        </Accordion>
    )
}
