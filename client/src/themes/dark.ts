import { createTheme } from '@material-ui/core/styles'
import { ThemesEnum } from '../config/constants'

export const dark = createTheme({
    palette: {
        type: ThemesEnum.DARK_THEME,
        primary: {
            main: '#2d2d2d',
        },
        secondary: {
            main: '#424242',
        },
        background: {
            default: '#010101',
        },
        text: {
            primary: '#FFFFFF',
        },
        footer: {
            main: '#110f14',
        },
        contrast: {
            main: '#8a8989',
        },
        whiteBackground: {
            main: 'rgba(255,255,255,0.2)',
        },
    },
    typography: {
        fontSize: 10,
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
})
