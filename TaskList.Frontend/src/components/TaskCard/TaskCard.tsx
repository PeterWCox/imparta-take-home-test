import { Icon, Text } from '@fluentui/react'
import { Task } from '../../models/Task'
import styles from './TaskCard.module.css'

export interface ITaskCardProps {
    task: Task
}

export const TaskCard = (props: ITaskCardProps) => {
    return (
        <li className={styles.task}>
            <div className={styles.icon}>
                <Icon
                    iconName={`${
                        props.task.isDone ? 'SkypeCircleCheck' : 'CircleRing'
                    }`}
                />
            </div>
            <div
                className={`${styles.title} ${
                    props.task.isDone ? styles.done : null
                }`}
            >
                <Text>{props.task.title}</Text>
            </div>
        </li>
    )
}
