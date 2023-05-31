import * as React from 'react'
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button'
import { Panel } from '@fluentui/react/lib/Panel'
import { Task } from '../../models/Task'
import { TextField } from '@fluentui/react'
import { useAppDispatch } from '../../redux/hooks'
import { deleteTask, updateTask } from '../../redux/slices/tasksSlice'

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
    const dispatch = useAppDispatch()

    // This panel doesn't actually save anything; the buttons are just an example of what
    // someone might want to render in a panel footer.
    const onRenderFooterContent = () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
            }}
        >
            {/* Delete button */}
            <DefaultButton
                text="Delete"
                onClick={() => dispatch(deleteTask(props.task.id))}
                style={{
                    backgroundColor: '#de383b',
                    color: 'white',
                }}
            />

            <PrimaryButton
                text="Save"
                onClick={() => {
                    dispatch(updateTask({ ...props.task, title }))
                    props.onDismiss()
                }}
                allowDisabledFocus
                // disabled={disabled}
                // checked={checked}
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
            <p>{title}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
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
