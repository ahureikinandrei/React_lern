import React, { FC } from 'react'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'

const SwitchSystem: FC = () => {
    return (
        <FormControl component="fieldset">
            <FormControlLabel
                value="top"
                control={<Switch color="secondary" />}
                label="°F | °C"
                labelPlacement="top"
            />
        </FormControl>
    )
}

export default SwitchSystem
