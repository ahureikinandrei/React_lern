import { createTheme } from '@material-ui/core/styles'

export const dark = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#001494',
        },
        secondary: {
            main: '#001371',
        },
        background: {
            default: '#000750',
        },
        text: {
            primary: '#FFFFFF',
        },
        footer: {
            main: '#0f0128',
        },
        header: {
            main: '#0d0634',
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
