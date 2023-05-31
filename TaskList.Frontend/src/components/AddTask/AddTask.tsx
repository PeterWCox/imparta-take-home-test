import { Icon, Text, TextField } from '@fluentui/react'
import { useState } from 'react'

export const AddTask = () => {
    const [taskName, setTaskName] = useState('')

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                padding: 30,
                boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
                backgroundColor: 'white',
                minWidth: '600px',
                margin: '0 auto',
            }}
        >
            <Icon iconName="Add" />
            <div
                style={{
                    width: '100%',
                    flexGrow: 1,
                }}
            >
                <TextField
                    placeholder="Add a task"
                    styles={{
                        root: {
                            border: 'none',
                        },
                    }}
                    value={taskName}
                    onChange={(_, newValue) => {
                        setTaskName(newValue || '')
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            console.log('Add task', taskName)
                            setTaskName('')
                        }
                    }}
                />
            </div>
        </div>
    )
}
