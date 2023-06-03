import { DefaultButton, IButtonProps } from '@fluentui/react'

export interface IDangerButtonProps extends IButtonProps {}

//FluentUI doesn't have a danger button, so we create one
export const DangerButton = (props: IDangerButtonProps) => {
    return (
        <DefaultButton
            {...props}
            style={{
                backgroundColor: '#de383b',
                borderColor: '#de383b',
                color: 'white',
            }}
        />
    )
}
