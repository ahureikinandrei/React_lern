import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import { createStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import TableWeather from '../TableWeather/TableWeather'
import WeatherCardSettings from '../WeatherCardSettings/WeatherCardSettings'

export const useStylesCard = makeStyles((theme) =>
    createStyles({
        card: {
            minWidth: 300,
            height: 285,
            borderRadius: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 40,
            marginBottom: 40,
            backgroundColor: theme.palette.secondary.main,
        },
        table: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
        },
        settings: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
        },
    })
)

export const WeatherCard: FC = () => {
    const classes = useStylesCard()

    return (
        <Card className={classes.card}>
            <Grid container>
                <Grid className={classes.table} item xs={10}>
                    <TableWeather />
                </Grid>
                <Grid className={classes.settings} item xs={2}>
                    <WeatherCardSettings />
                </Grid>
            </Grid>
        </Card>
    )
}
