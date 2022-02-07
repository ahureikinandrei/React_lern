import React, { FC } from 'react'
import Button from '@material-ui/core/Button'
import {
    GRAPH_BTN_TEXT,
    MAP_BTN_TEXT,
    TABLE_BTN_TEXT,
} from '../../config/constants'
import { useStyles } from './styles'

interface IWeatherCardSettingsProps {
    swapViewMod: (value: string) => void
    viewState: string
}

const buttonEnum = [TABLE_BTN_TEXT, GRAPH_BTN_TEXT, MAP_BTN_TEXT]

const WeatherCardSettings: FC<IWeatherCardSettingsProps> = ({
    swapViewMod,
    viewState,
}) => {
    const { settings } = useStyles()

    return (
        <div className={settings}>
            {buttonEnum.map((buttonValue) => {
                return (
                    <Button
                        key={buttonValue}
                        variant={
                            buttonValue === viewState ? 'contained' : 'outlined'
                        }
                        onClick={() => {
                            swapViewMod(buttonValue)
                        }}
                        color={
                            buttonValue === viewState ? 'primary' : 'default'
                        }
                        fullWidth
                    >
                        {buttonValue.toUpperCase()}
                    </Button>
                )
            })}
        </div>
    )
}

export default WeatherCardSettings
