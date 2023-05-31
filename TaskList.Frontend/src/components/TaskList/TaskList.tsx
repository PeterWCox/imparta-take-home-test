import { Task } from '../../models/Task'
import { TaskCard } from '../TaskCard/TaskCard'
import styles from './TaskList.module.css'

export interface ITaskListProps {
    tasks: Task[]
}

export const TaskList = (props: ITaskListProps) => {
    return (
        <ul
            className={styles.taskList}
            // style={{
            //     display: 'flex',
            //     flexDirection: 'column',
            //     gap: 10,
            // }}
        >
            {props.tasks.map((task) => (
                <TaskCard task={task} />
            ))}
        </ul>
    )
}
