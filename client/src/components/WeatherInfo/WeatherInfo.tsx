import React, { FC } from 'react'
import { createStyles, makeStyles, Typography } from '@material-ui/core'
import NearMeOutlinedIcon from '@material-ui/icons/NearMeOutlined'
import { unixToDay, unixToHour } from '../../utils/dateUtils'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import {
    selectErrorWeatherData,
    selectIsLoadingWeather,
    selectWeatherData,
} from '../../store/reducers/weather/selectors'

export const useStylesWeatherInfo = makeStyles(() =>
    createStyles({
        wrapper: { minWidth: 240, overflow: 'hidden' },
        city: { fontSize: '1.5rem', lineHeight: 1.2 },
        date: { fontSize: '1.25rem', lineHeight: 1.2 },
        temperature: { fontSize: '1.5rem', lineHeight: 1.2, fontWeight: 600 },
        subInformation: {
            paddingTop: 5,
            fontSize: '0.875rem',
            lineHeight: 1.2,
            display: 'flex',
            alignItems: 'center',
        },
        subInformationIcon: {
            paddingRight: 5,
        },
    })
)

const WeatherInfo: FC = () => {
    const classes = useStylesWeatherInfo()
    const data = useTypedSelector(selectWeatherData)
    const loading = useTypedSelector(selectIsLoadingWeather)
    const error = useTypedSelector(selectErrorWeatherData)

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <div className={classes.wrapper}>
            <Typography variant="subtitle1" className={classes.city}>
                {data.address}
            </Typography>
            <Typography variant="subtitle1" className={classes.date}>
                {unixToDay(data.datetimeEpoch)} |{' '}
                {unixToHour(data.datetimeEpoch)}
            </Typography>
            <Typography variant="subtitle1" className={classes.temperature}>
                {data.temp} °C
            </Typography>
            <Typography variant="subtitle1" className={classes.subInformation}>
                <NearMeOutlinedIcon className={classes.subInformationIcon} />
                Wind {data.windspeed} km/h
            </Typography>
            <Typography variant="subtitle1" className={classes.subInformation}>
                <NearMeOutlinedIcon className={classes.subInformationIcon} />
                Hum {data.humidity} %
            </Typography>
        </div>
    )
}

export default WeatherInfo
