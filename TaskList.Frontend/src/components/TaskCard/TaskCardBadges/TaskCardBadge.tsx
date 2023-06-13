import { Icon, Text } from '@fluentui/react'

export interface ITaskCardBadgeProps {
    label?: string
    iconName?: string
    color?: string
}

export const TaskCardBadge = (props: ITaskCardBadgeProps) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                color: props.color ?? '',
            }}
        >
            {/* Get a sun icon from fluent UI */}
            {props.iconName ? (
                <Icon
                    iconName={props.iconName}
                    style={{
                        fontSize: '1rem',
                        color: props.color ?? '',
                    }}
                />
            ) : null}

            {props.label ? (
                <Text
                    variant="medium"
                    style={{ marginLeft: '0.2rem', color: props.color ?? '' }}
                >
                    {props.label}
                </Text>
            ) : null}
        </div>
    )
}
