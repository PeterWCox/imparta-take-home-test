import { Icon, Text } from '@fluentui/react'
import { DueDateHelpers } from '../../utils/DueDateHelpers'

export interface IAddMyDayProps {
    isMyDay: boolean
    setIsMyDay: () => void
}

export const AddMyDay = (props: IAddMyDayProps) => {
    console.log('props.isMyDay', props.isMyDay)

    return (
        <div
            className="container"
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                padding: '0.5rem',
                color: props.isMyDay ? DueDateHelpers.BLUE : '',
            }}
        >
            <div
                className="left"
                onClick={() => props.setIsMyDay()}
                style={{
                    marginRight: '0.5rem',
                }}
            >
                {/* FluentUI Icon for calendar */}
                <Icon
                    iconName="Sunny"
                    style={{
                        fontSize: '1.5rem',
                    }}
                />
            </div>
            <div
                className="right"
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexGrow: 1,
                }}
            >
                <div>
                    <Text
                        variant="medium"
                        style={{
                            cursor: 'pointer',
                            color: props.isMyDay ? DueDateHelpers.BLUE : '',
                        }}
                        onClick={() => props.setIsMyDay()}
                    >
                        {props.isMyDay ? 'Added to My Day' : 'Add to My Day'}
                    </Text>
                </div>

                {/* X Close Icon */}
                {props.isMyDay ? (
                    <div
                        style={{
                            cursor: 'pointer',
                        }}
                    >
                        <Icon
                            iconName="ChromeClose"
                            style={{
                                fontSize: '1rem',
                            }}
                            onClick={() => props.setIsMyDay()}
                        />
                    </div>
                ) : null}
            </div>
        </div>
    )
}
