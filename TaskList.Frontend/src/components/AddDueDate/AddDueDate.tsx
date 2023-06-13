import {
    ContextualMenu,
    ContextualMenuItemType,
    IContextualMenuItem,
    Icon,
    Text,
} from '@fluentui/react'
import { useCallback, useRef, useState } from 'react'
import { DueDateHelpers } from '../../utils/DueDateHelpers'

export interface IAddDueDateProps {
    dueDate: Date | null
    setDueDate: (dueDate: Date | null) => void
}

export const AddDueDate = (props: IAddDueDateProps) => {
    const linkRef = useRef(null)

    const onHideContextualMenu = useCallback(
        () => setShowContextualMenu(false),
        []
    )
    const [showContextualMenu, setShowContextualMenu] = useState<boolean>(false)

    const onTaskCardClick = useCallback((ev: React.MouseEvent<HTMLElement>) => {
        ev.preventDefault() // don't navigate
        setShowContextualMenu(true)
    }, [])

    const obj = DueDateHelpers.getDueDateButtonProps(props.dueDate)

    const menuItems: IContextualMenuItem[] = [
        {
            key: 'today',
            iconProps: { iconName: 'AddNotes' },
            text: 'Today',
            onClick: () => {
                //Get the last minute of today
                const today = new Date()
                today.setHours(23, 59, 59, 999)
                props.setDueDate(today)
            },
        },
        {
            key: 'tomorrow',
            iconProps: { iconName: 'AddNotes' },
            text: 'Tomorrow',
            onClick: () => {
                //Get the last minute of tomorrow
                const tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                tomorrow.setHours(23, 59, 59, 999)
                props.setDueDate(tomorrow)
            },
        },
        {
            key: 'nextWeek',
            iconProps: { iconName: 'AddNotes' },
            text: 'Next Week',
            onClick: () => {
                //Get the last minute of next week
                const nextWeek = new Date()
                nextWeek.setDate(nextWeek.getDate() + 7)
                nextWeek.setHours(23, 59, 59, 999)
                props.setDueDate(nextWeek)
            },
        },
        {
            key: 'divider_1',
            itemType: ContextualMenuItemType.Divider,
        },
        {
            key: 'pickDate',
            iconProps: { iconName: 'AddNotes' },
            text: 'Pick a date',
        },
    ]

    return (
        <div
            className="container"
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                padding: '0.5rem',
                color: obj.color,
            }}
        >
            <div
                className="left"
                style={{
                    marginRight: '0.5rem',
                }}
            >
                {/* FluentUI Icon for calendar */}
                <Icon
                    iconName="Calendar"
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
                <div
                    ref={linkRef}
                    onContextMenu={(e) => {
                        e.preventDefault()
                        onTaskCardClick(e)
                    }}
                    onClick={(e) => {
                        e.preventDefault()
                        onTaskCardClick(e)
                    }}
                >
                    <Text
                        variant="medium"
                        style={{
                            color: props.dueDate ? obj.color : '',
                            cursor: 'pointer',
                        }}
                    >
                        {obj.text}
                    </Text>
                </div>

                {/* FluentUI Icon for calendar */}
                {props.dueDate !== null ? (
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
                            onClick={() => props.setDueDate(null)}
                        />
                    </div>
                ) : null}

                <ContextualMenu
                    items={menuItems}
                    hidden={!showContextualMenu}
                    target={linkRef}
                    onItemClick={onHideContextualMenu}
                    onDismiss={onHideContextualMenu}
                />
            </div>
        </div>
    )
}
