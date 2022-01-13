import { createTheme } from '@material-ui/core/styles'

declare module '@material-ui/core/styles/createPalette' {
    interface Palette {
        footer: Palette['primary']
    }

    interface PaletteOptions {
        footer: PaletteOptions['primary']
    }
}

export const theme = createTheme({
    palette: {
        primary: {
            main: '#FCD2C2',
        },
        secondary: {
            main: '#F0F0F0',
        },
        background: {
            default: '#FFFFFF',
        },
        text: {
            primary: '#202020',
        },
        footer: {
            main: '#0B3846',
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
