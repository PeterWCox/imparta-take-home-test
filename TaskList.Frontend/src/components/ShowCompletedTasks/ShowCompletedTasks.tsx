import { PrimaryButton } from '@fluentui/react'
import styles from './ShowCompletedTasks.module.css'

export interface IShowCompletedTasksProps {
    count: number
    showCompletedTasks: boolean
    onClick: () => void
}

export const ShowCompletedTasks = (props: IShowCompletedTasksProps) => {
    return (
        <PrimaryButton
            className={styles.ShowCompletedTasks}
            text={`Completed (${props.count})`}
            onClick={props.onClick}
            iconProps={{
                iconName: props.showCompletedTasks
                    ? 'ChevronDown'
                    : 'ChevronRight',
            }}
        />
    )
}
