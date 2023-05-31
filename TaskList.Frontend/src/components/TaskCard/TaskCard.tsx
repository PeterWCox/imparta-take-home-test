import { Icon, Text } from '@fluentui/react'

export const TaskCard = () => {
    return (
        <div
            className="task"
            style={{
                display: 'flex',
                flexDirection: 'row',
                boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
                alignItems: 'center',
                padding: 5,
            }}
        >
            <div>
                <Icon iconName="CircleRing" />
            </div>
            <div>
                <Text variant="medium">Buy milk</Text>
            </div>
        </div>
    )
}
