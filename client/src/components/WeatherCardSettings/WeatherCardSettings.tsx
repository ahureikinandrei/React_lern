import React, { FC } from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core'
import {
    GRAPH_BTN_TEXT,
    MAP_BTN_TEXT,
    TABLE_BTN_TEXT,
} from '../../config/constants'

export const useStylesCardSettings = makeStyles(() =>
    createStyles({
        settings: {
            display: 'flex',
            height: 200,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
        },
    })
)

interface IWeatherCardSettingsProps {
    swapViewMod: (value: string) => void
    viewState: string
}

const buttonEnum = [TABLE_BTN_TEXT, GRAPH_BTN_TEXT, MAP_BTN_TEXT]

const WeatherCardSettings: FC<IWeatherCardSettingsProps> = ({
    swapViewMod,
    viewState,
}) => {
    const classes = useStylesCardSettings()

    return (
        <div className={classes.settings}>
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
