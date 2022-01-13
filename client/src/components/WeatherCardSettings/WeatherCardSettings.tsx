import React, { FC } from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core'

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

const WeatherCardSettings: FC = () => {
    const classes = useStylesCardSettings()
    return (
        <div className={classes.settings}>
            <Button variant="contained" color="primary" fullWidth>
                Table
            </Button>
            <Button variant="outlined" fullWidth>
                Map
            </Button>
            <Button variant="outlined" fullWidth>
                Graph
            </Button>
        </div>
    )
}

export default WeatherCardSettings
