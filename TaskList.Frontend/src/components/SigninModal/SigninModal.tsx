import {
    FontWeights,
    IStackProps,
    MessageBar,
    MessageBarType,
    Modal,
    Text,
    TextField,
    getTheme,
    mergeStyleSets,
} from '@fluentui/react'
import {
    DefaultButton,
    IButtonStyles,
    IconButton,
} from '@fluentui/react/lib/Button'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { thunkLogin } from '../../redux/slices/tasksSlice'
import styles from './SigninModal.module.css'

export interface ISigninModalProps {
    isModalOpen: boolean
    hideModal: () => void
}

export const SigninModal = (props: ISigninModalProps) => {
    //States
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    //Hooks
    const dispatch = useAppDispatch()
    const { error } = useAppSelector((state) => state.tasks)

    //Handlers
    const handleUsernameChange = (_: any, newValue?: string) => {
        setUsername(newValue || '')
    }
    const handlePasswordChange = (_: any, newValue?: string) => {
        setPassword(newValue || '')
    }

    const handleSigninButtonClick = () => {
        dispatch(
            thunkLogin({
                username,
                password,
            })
        )
        if (!error) props.hideModal()
    }

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
                <Text variant="large">Sign in</Text>

                {/* X Button */}
                <IconButton
                    styles={iconButtonStyles}
                    iconProps={{
                        iconName: 'Cancel',
                    }}
                    ariaLabel="Close popup modal"
                    onClick={props.hideModal}
                />
            </div>
            {/* Modal Body */}
            <form className={styles.body}>
                {/* Username */}
                <TextField label="Username" onChange={handleUsernameChange} />

                {/* Password */}
                <TextField
                    label="Password"
                    type="password"
                    canRevealPassword
                    revealPasswordAriaLabel="Show password"
                    onChange={handlePasswordChange}
                />

                {/* Error message */}
                {error ? (
                    <MessageBar messageBarType={MessageBarType.error}>
                        {error}
                    </MessageBar>
                ) : null}

                {/* Button Group */}
                <div className={styles.buttonGroup}>
                    {/* Signin Button */}
                    <DefaultButton
                        text="Signin"
                        onClick={handleSigninButtonClick}
                        allowDisabledFocus
                    />
                </div>
            </form>
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
    header: [
        // eslint-disable-next-line deprecation/deprecation
        theme.fonts.xLargePlus,
        {
            flex: '1 1 auto',
            borderTop: `4px solid ${theme.palette.themePrimary}`,
            color: theme.palette.neutralPrimary,
            display: 'flex',
            alignItems: 'center',
            fontWeight: FontWeights.semibold,
            padding: '12px 12px 14px 24px',
        },
    ],
    heading: {
        color: theme.palette.neutralPrimary,
        fontWeight: FontWeights.semibold,
        fontSize: 'inherit',
        margin: '0',
    },
    body: {
        flex: '4 4 auto',
        padding: '0 24px 24px 24px',
        overflowY: 'hidden',
        selectors: {
            p: { margin: '14px 0' },
            'p:first-child': { marginTop: 0 },
            'p:last-child': { marginBottom: 0 },
        },
    },
})
const stackProps: Partial<IStackProps> = {
    horizontal: true,
    tokens: { childrenGap: 40 },
    styles: { root: { marginBottom: 20 } },
}
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
