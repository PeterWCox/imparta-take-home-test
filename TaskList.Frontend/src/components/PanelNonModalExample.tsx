// import {
//     Customizer,
//     DefaultButton,
//     Fabric,
//     Panel,
//     createTheme,
//     initializeIcons,
// } from '@fluentui/react'
// import React, { useState } from 'react'
// import ReactDOM from 'react-dom'

// // const { useConstCallback } = window.FabricReactHooks
// const defaultTheme = createTheme({})
// // Initialize icons in case this example uses them
// // as
// initializeIcons()

// const getPanelTheme = (currentSettings) => {
//     const { theme, ...rest } = currentSettings
//     const rtlTheme = { ...theme, rtl: true }
//     return { ...rest, theme: rtlTheme }
// }

// const PanelBasicExample: React.FunctionComponent = () => {
//     const [isOpen, setIsOpen] = useState(false)
//     const [ltrisOpen, setLtrIsOpen] = React.useState(false)

//     const ltropenPanel = useConstCallback(() => setLtrIsOpen(true))
//     const ltrdismissPanel = useConstCallback(() => setLtrIsOpen(false))
//     const [ltrCustomisOpen, setltrCustomIsOpen] = React.useState(false)

//     const ltrCustomopenPanel = useConstCallback(() => setltrCustomIsOpen(true))
//     const ltrCustomdismissPanel = useConstCallback(() =>
//         setltrCustomIsOpen(false)
//     )

//     const openPanel = useConstCallback(() => setIsOpen(true))
//     const dismissPanel = useConstCallback(() => setIsOpen(false))

//     return (
//         <div>
//             <DefaultButton text="Open LTR Panel" onClick={ltropenPanel} />
//             <Panel
//                 headerText="Sample panel"
//                 isOpen={ltrisOpen}
//                 onDismiss={ltrdismissPanel}
//                 closeButtonAriaLabel="Close"
//             >
//                 <p>Content goes here.</p>
//             </Panel>
//             <DefaultButton
//                 text="Open ltrCustom Panel"
//                 onClick={ltrCustomopenPanel}
//             />
//             <Panel
//                 headerText="Sample panel"
//                 isOpen={ltrCustomisOpen}
//                 onDismiss={ltrCustomdismissPanel}
//                 closeButtonAriaLabel="Close"
//                 customWidth={'300px'}
//                 type={8}
//             >
//                 <p>Content goes here.</p>
//             </Panel>

//             <DefaultButton text="Open RTL Panel" onClick={openPanel} />
//             <Customizer settings={getPanelTheme}>
//                 <Panel
//                     headerText="Sample panel"
//                     isOpen={isOpen}
//                     onDismiss={dismissPanel}
//                     closeButtonAriaLabel="Close"
//                 >
//                     <p>Content goes here.</p>
//                 </Panel>
//             </Customizer>
//         </div>
//     )
// }
