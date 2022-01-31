import { ThemeProvider } from '@material-ui/core'
import React, { FC } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { selectTheme } from '../store/reducers/settings/selectors'
import getTheme from '../themes/themes'

export const CustomThemeProvider: FC = ({ children }) => {
    const themeTitle = useTypedSelector(selectTheme)

    return (
        <ThemeProvider theme={getTheme(themeTitle)}>{children}</ThemeProvider>
    )
}
