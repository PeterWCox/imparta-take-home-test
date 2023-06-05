import { Icon, Text } from '@fluentui/react'
import { useState } from 'react'
import styles from './Accordion.module.css'

export interface IAccordionProps {
    title: string
    children: React.ReactNode
}

export const Accordion = (props: IAccordionProps) => {
    //States
    const [isContentDisplayed, setIsContentDisplayed] = useState<boolean>(false)

    //Handlers
    const onAccordionHeaderClick = () => {
        setIsContentDisplayed(!isContentDisplayed)
    }

    return (
        <div className={styles.accordion}>
            <div className={styles.header} onClick={onAccordionHeaderClick}>
                {/* Status Title */}
                <Text variant="xLarge">{props.title}</Text>
                <Icon
                    iconName={
                        isContentDisplayed ? 'ChevronDown' : 'ChevronRight'
                    }
                    className={styles.icon}
                />
            </div>

            {!isContentDisplayed ? (
                <div className={styles.container}>
                    {!isContentDisplayed ? props.children : null}
                </div>
            ) : null}
        </div>
    )
}
