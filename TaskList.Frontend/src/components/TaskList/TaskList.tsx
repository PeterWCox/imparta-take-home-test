import { Task } from '../../models/Task'
import { TaskCard } from '../TaskCard/TaskCard'
import styles from './TaskList.module.css'

export interface ITaskListProps {
    tasks: Task[]
}

export const TaskList = (props: ITaskListProps) => {
    return (
        <ul className={styles.taskList}>
            {props.tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </ul>
    )
}
