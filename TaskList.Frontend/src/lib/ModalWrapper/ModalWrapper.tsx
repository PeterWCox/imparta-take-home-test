import {
    IButtonStyles,
    IconButton,
    Modal,
    Text,
    getTheme,
    mergeStyleSets,
} from '@fluentui/react'
import styles from './ModalWrapper.module.css'

export interface IModalWrapperProps {
    title: string
    isModalOpen: boolean
    hideModal: () => void
    children: React.ReactNode
}

export const ModalWrapper = (props: IModalWrapperProps) => {
    return (
        <Modal
            isOpen={props.isModalOpen}
            onDismiss={props.hideModal}
            isBlocking={false}
            containerClassName={contentStyles.container}
        >
            {/* Modal Header */}
            <div className={styles.header}>
                {/* Login text */}
                <Text variant="xLarge">{props.title}</Text>

                {/* X Button */}
                <IconButton
                    styles={iconButtonStyles}
                    iconProps={{
                        iconName: 'Cancel',
                    }}
                    ariaLabel={`Close ${props.title} modal`}
                    onClick={props.hideModal}
                />
            </div>

            <div className={styles.body}>{props.children}</div>
        </Modal>
    )
}

const theme = getTheme()
const contentStyles = mergeStyleSets({
    container: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'stretch',
    },
})

const iconButtonStyles: Partial<IButtonStyles> = {
    root: {
        color: theme.palette.neutralPrimary,
        marginLeft: 'auto',
        marginTop: '4px',
        marginRight: '2px',
    },
    rootHovered: {
        color: theme.palette.neutralDark,
    },
}
