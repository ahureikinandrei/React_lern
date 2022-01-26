import React, { FC } from 'react'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { selectTheme } from '../../store/reducers/settings/selectors'
import { ThemesEnum } from '../../config/constants'

const SwitcherThemes: FC = () => {
    const themeTitle = useTypedSelector(selectTheme)
    const { switchTheme } = useActions()

    const changeUnits = (): void => {
        switchTheme(
            themeTitle === ThemesEnum.DARK_THEME
                ? ThemesEnum.LIGHT_THEME
                : ThemesEnum.DARK_THEME
        )
    }

    return (
        <FormControl component="fieldset">
            <FormControlLabel
                value="theme"
                control={<Switch color="secondary" />}
                label="Dark theme"
                labelPlacement="top"
                checked={themeTitle === ThemesEnum.DARK_THEME}
                onChange={changeUnits}
            />
        </FormControl>
    )
}

export default SwitcherThemes
