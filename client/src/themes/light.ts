import { createTheme } from '@material-ui/core/styles'

declare module '@material-ui/core/styles/createPalette' {
    interface Palette {
        footer: Palette['primary']
        header: Palette['primary']
    }

    interface PaletteOptions {
        footer: PaletteOptions['primary']
        header: PaletteOptions['primary']
    }
}

export const light = createTheme({
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
        header: {
            main: '#E4DFD6',
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
