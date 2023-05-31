import { useId } from '@fluentui/react-hooks'
import {
    getTheme,
    mergeStyleSets,
    FontWeights,
    Modal,
    IStackProps,
    TextField,
} from '@fluentui/react'
import {
    IconButton,
    IButtonStyles,
    PrimaryButton,
    DefaultButton,
} from '@fluentui/react/lib/Button'
import { useState } from 'react'

export interface IRegisterModalProps {
    isModalOpen: boolean
    hideModal: () => void
}

export const RegisterModal = (props: IRegisterModalProps) => {
    const titleId = useId('title')

    const userName = useState('')
    const emailAdress = useState('')
    const password = useState('')

    return (
        <Modal
            titleAriaId={titleId}
            isOpen={props.isModalOpen}
            onDismiss={props.hideModal}
            isBlocking={false}
            containerClassName={contentStyles.container}
        >
            {/* Modal Header */}
            <div className={contentStyles.header}>
                {/* Modal Header */}
                <h2 className={contentStyles.heading} id={titleId}>
                    Register
                </h2>
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
            <form
                className={contentStyles.body}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20,
                }}
                // onSubmit=()
            >
                {/* Username */}
                <TextField label="Username" errorMessage="Error message" />
                {/* Email address */}
                <TextField label="Password" errorMessage="Error message" />
                <TextField
                    label="Password"
                    type="password"
                    canRevealPassword
                    revealPasswordAriaLabel="Show password"
                />
                {/* Button Group */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                    }}
                >
                    {/* Cancel button */}
                    <DefaultButton
                        text="Cancel"
                        // onClick={_alertClicked}
                        allowDisabledFocus
                        // disabled={disabled}
                        // checked={checked}
                    />
                    <PrimaryButton
                        text="Submit"
                        // onClick={_alertClicked}
                        allowDisabledFocus
                        // disabled={disabled}
                        // checked={checked}
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
