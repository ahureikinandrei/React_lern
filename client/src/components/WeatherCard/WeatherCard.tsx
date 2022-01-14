import React, { FC, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import { createStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import TableWeather from '../TableWeather/TableWeather'
import WeatherCardSettings from '../WeatherCardSettings/WeatherCardSettings'
import { useActions } from '../../hooks/useActions'
import GraphWeather from '../GraphWeather/GraphWeather'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import {
    selectWeatherDataForecast,
    selectWeatherDataLatitude,
    selectWeatherDataLongitude,
} from '../../store/reducers/weather/selectors'
import InteractiveMap from '../InteractiveMap/InteractiveMap'
import { MAP_BTN_TEXT, TABLE_BTN_TEXT } from '../../config/constants'

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
    const [viewState, changeViewState] = useState(TABLE_BTN_TEXT)
    const classes = useStylesCard()
    const forecast = useTypedSelector(selectWeatherDataForecast)
    const latitude = useTypedSelector(selectWeatherDataLatitude)
    const longitude = useTypedSelector(selectWeatherDataLongitude)

    const { deleteCard } = useActions()
    const deleteCardClick = (): void => {
        deleteCard(id)
    }

    const swapViewMod = (value: string): void => {
        changeViewState(value)
    }

    return (
        <Card className={classes.card}>
            <Grid container>
                <Grid className={classes.table} item xs={10}>
                    {/* eslint-disable-next-line no-nested-ternary */}
                    {viewState === TABLE_BTN_TEXT ? (
                        <TableWeather forecast={forecast} />
                    ) : viewState === MAP_BTN_TEXT ? (
                        <InteractiveMap
                            latitude={latitude}
                            longitude={longitude}
                        />
                    ) : (
                        <GraphWeather forecast={forecast} />
                    )}
                </Grid>
                <Grid className={classes.settings} item xs={2}>
                    <WeatherCardSettings
                        swapViewMod={swapViewMod}
                        viewState={viewState}
                    />
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
