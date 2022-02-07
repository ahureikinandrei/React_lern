import { Theme } from '@material-ui/core/styles/createTheme'
import { light } from './light'
import { dark } from './dark'

const themes: { [index: string]: Theme } = {
    light,
    dark,
}

export default function getTheme(theme: string): Theme {
    return themes[theme]
}
