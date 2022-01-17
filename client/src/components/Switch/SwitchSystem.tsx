import React, { FC } from 'react'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { selectWeatherUnits } from '../../store/reducers/weather/selectors'
import { DEGREES_CELSIUS, DEGREES_FAHRENHEIT } from '../../config/constants'

const SwitchSystem: FC = () => {
    const unitsDegrees = useTypedSelector(selectWeatherUnits)
    const { switchUnits } = useActions()

    const changeUnits = (): void => {
        switchUnits(
            unitsDegrees === DEGREES_CELSIUS
                ? DEGREES_FAHRENHEIT
                : DEGREES_CELSIUS
        )
    }

    return (
        <FormControl component="fieldset">
            <FormControlLabel
                value="top"
                control={<Switch color="secondary" />}
                label="°C | °F"
                labelPlacement="top"
                checked={unitsDegrees === DEGREES_FAHRENHEIT}
                onChange={changeUnits}
            />
        </FormControl>
    )
}

export default SwitchSystem
