import {
    IButtonStyles,
    IconButton,
    Modal,
    Text,
    getTheme,
} from '@fluentui/react'
import styles from './ModalForm.module.css'

export interface IModalFormProps {
    title: string
    isModalOpen: boolean
    hideModal: () => void
    onSubmit: () => void
    children: React.ReactNode
}

export const ModalForm = (props: IModalFormProps) => {
    return (
        <Modal
            isOpen={props.isModalOpen}
            onDismiss={props.hideModal}
            isBlocking={false}
            containerClassName={styles.container}
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

            <form className={styles.body} onSubmit={props.onSubmit}>
                {props.children}
            </form>
        </Modal>
    )
}

const theme = getTheme()

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
