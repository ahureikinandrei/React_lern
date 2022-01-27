import { createTheme } from '@material-ui/core/styles'

declare module '@material-ui/core/styles/createPalette' {
    interface Palette {
        footer: Palette['primary']
        contrast: Palette['primary']
        whiteBackground: Palette['primary']
    }

    interface PaletteOptions {
        footer: PaletteOptions['primary']
        contrast: PaletteOptions['primary']
        whiteBackground: PaletteOptions['primary']
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
            main: '#5f6262',
        },
        contrast: {
            main: '#E4DFD6',
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
