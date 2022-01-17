import React, { ReactElement, ReactNode } from 'react'
import { AuthModalItemsValue } from './types'

interface TabPanelProps {
    index: AuthModalItemsValue
    value: AuthModalItemsValue
    children: ReactNode
}

const TabPanel = (props: TabPanelProps): ReactElement => {
    const { children, value, index } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
        >
            {value === index && <div>{children}</div>}
        </div>
    )
}

export default TabPanel
