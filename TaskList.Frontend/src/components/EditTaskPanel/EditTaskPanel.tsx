import { DefaultButton, PrimaryButton, TextField } from '@fluentui/react'
import { Panel } from '@fluentui/react/lib/Panel'
import * as React from 'react'
import { Task } from '../../models/Task'
// import { thunkDeleteTask, thunkUpdateTask } from '../../redux/slices/tasksSlice'
import styles from './EditTaskPanel.module.css'

const buttonStyles = { root: { marginRight: 8 } }

export interface IEditTaskPanelProps {
    task: Task
    isOpen: boolean
    onDismiss: () => void
}

export const EditTaskPanel = (props: IEditTaskPanelProps) => {
    //States
    const [title, setTitle] = React.useState(props.task.title)

    //Hooks
    // const dispatch = useAppDispatch()

    // This panel doesn't actually save anything; the buttons are just an example of what
    // someone might want to render in a panel footer.
    const onRenderFooterContent = () => (
        <div className={styles.buttonGroup}>
            {/* Delete button */}
            <DefaultButton
                text="Delete"
                // onClick={() => dispatch(thunkDeleteTask(props.task.id))}
                style={{
                    backgroundColor: '#de383b',
                    color: 'white',
                }}
            />

            <PrimaryButton
                text="Save"
                onClick={() => {
                    // dispatch(
                    //     thunkUpdateTask(props.task.id, { ...props.task, title })
                    // )
                    props.onDismiss()
                }}
                allowDisabledFocus
            />
        </div>
    )

    return (
        <Panel
            isOpen={props.isOpen}
            onDismiss={props.onDismiss}
            // headerText="Panel with footer at bottom"
            closeButtonAriaLabel="Close"
            onRenderFooterContent={onRenderFooterContent}
            // Stretch panel content to fill the available height so the footer is positioned
            // at the bottom of the page
            isFooterAtBottom={true}
        >
            <div className={styles.form}>
                {/* Username */}
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e, newValue) => {
                        setTitle(newValue ?? '')
                    }}
                    errorMessage={
                        title.length === 0 ? 'Title cannot be empty' : ''
                    }
                />
            </div>
        </Panel>
    )
}
