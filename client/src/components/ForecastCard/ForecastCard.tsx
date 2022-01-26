import React, { FC, ReactElement } from 'react'
import { Card, createStyles, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { unixToDay } from '../../utils/dateUtils'
import { DD_MM_DATE_FORMAT } from '../../config/constants'
import {
    WeatherIconList,
    WeatherIconsTitle,
} from '../WeatherIcons/WeatherIcons'
import { ReactComponent as Drop } from '../../assets/icons/drop.svg'

interface IForecastCardProps {
    temp: number
    humidity: number
    datetimeEpoch: number
    unitsDegrees: string
    timezone: string
    icon: string
}

const useStylesForecastCard = makeStyles((theme) =>
    createStyles({
        card: {
            width: 110,
            height: 200,
            marginBottom: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
            borderRadius: 20,
            backgroundColor: theme.palette.primary.main,
            [theme.breakpoints.down('xs')]: {
                width: 70,
            },
        },
        textAlign: {
            textAlign: 'center',
            [theme.breakpoints.down('xs')]: {
                width: 45,
            },
        },
        weatherIcon: {
            height: 50,
            width: 50,
        },
        humidityIcon: {
            paddingTop: 3,
            marginRight: 5,
        },
    })
)

const ForecastCard: FC<IForecastCardProps> = ({
    temp,
    humidity,
    datetimeEpoch,
    unitsDegrees,
    timezone,
    icon,
}) => {
    const classes = useStylesForecastCard()

    const findIcon = (icon: string): ReactElement => {
        return (
            WeatherIconList[icon] ||
            WeatherIconList[WeatherIconsTitle.CLOUDY_DAY]
        )
    }

    return (
        <Card className={classes.card}>
            <Typography variant="h5">
                {temp} {unitsDegrees}
            </Typography>
            <Typography variant="h5" className={classes.textAlign}>
                {unixToDay(datetimeEpoch, timezone, DD_MM_DATE_FORMAT)}
            </Typography>
            <div className={classes.weatherIcon}>{findIcon(icon)}</div>
            <Typography variant="h5">
                <Drop className={classes.humidityIcon} />
                {humidity} %
            </Typography>
        </Card>
    )
}

export default ForecastCard
