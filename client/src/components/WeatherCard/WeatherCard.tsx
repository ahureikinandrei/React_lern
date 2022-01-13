import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import { createStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import TableWeather from '../TableWeather/TableWeather'
import WeatherCardSettings from '../WeatherCardSettings/WeatherCardSettings'
import { useActions } from '../../hooks/useActions'

export const useStylesCard = makeStyles((theme) =>
    createStyles({
        card: {
            position: 'relative',
            minWidth: 300,
            height: 285,
            borderRadius: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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
        icon: {
            position: 'absolute',
            top: 15,
            right: 20,
        },
    })
)

interface IWeatherCardProps {
    id: string
}

export const WeatherCard: FC<IWeatherCardProps> = ({ id }) => {
    const classes = useStylesCard()
    const { deleteCard } = useActions()
    const deleteCardClick = (): void => {
        deleteCard(id)
    }

    return (
        <Card className={classes.card}>
            <Grid container>
                <Grid className={classes.table} item xs={10}>
                    <TableWeather />
                </Grid>
                <Grid className={classes.settings} item xs={2}>
                    <WeatherCardSettings />
                </Grid>
                <IconButton
                    className={classes.icon}
                    onClick={deleteCardClick}
                    aria-label="delete"
                >
                    <DeleteIcon />
                </IconButton>
            </Grid>
        </Card>
    )
}
