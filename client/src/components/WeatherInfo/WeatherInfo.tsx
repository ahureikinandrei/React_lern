import React, { FC } from 'react'
import { createStyles, makeStyles, Typography } from '@material-ui/core'
import NearMeOutlinedIcon from '@material-ui/icons/NearMeOutlined'
import { unixToDay, unixToHour } from '../../utils/dateUtils'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import {
    selectErrorWeatherData,
    selectIsLoadingWeather,
    selectTempInUnits,
    selectWeatherData,
    selectWeatherUnits,
} from '../../store/reducers/weather/selectors'

export const useStylesWeatherInfo = makeStyles((theme) =>
    createStyles({
        wrapper: {
            minWidth: 180,
            overflow: 'hidden',
            fontSize: 16,
            [theme.breakpoints.down('xs')]: {
                width: '100%',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                fontSize: 12,
                flexWrap: 'wrap',
                '& h6': {
                    marginRight: 5,
                    marginLeft: 5,
                },
            },
        },
        city: { fontSize: '1.5em', lineHeight: 1.2 },
        date: { fontSize: '1.25em', lineHeight: 1.2 },
        temperature: { fontSize: '1.5em', lineHeight: 1.2, fontWeight: 600 },
        subInformation: {
            paddingTop: 5,
            fontSize: '0.875em',
            lineHeight: 1.2,
            display: 'flex',
            alignItems: 'center',
        },
        subInformationIcon: {
            paddingRight: 5,
        },
        status: {
            width: '100%',
            textAlign: 'center',
            fontSize: '1.5em',
        },
    })
)

const WeatherInfo: FC = () => {
    const classes = useStylesWeatherInfo()
    const data = useTypedSelector(selectWeatherData)
    const loading = useTypedSelector(selectIsLoadingWeather)
    const error = useTypedSelector(selectErrorWeatherData)
    const unitsDegrees = useTypedSelector(selectWeatherUnits)
    const temp = useTypedSelector(selectTempInUnits)

    if (loading) {
        return (
            <Typography variant="h3" className={classes.status}>
                Loading...
            </Typography>
        )
    }

    if (error) {
        return (
            <Typography variant="h3" className={classes.status}>
                {error}
            </Typography>
        )
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
                {temp} {unitsDegrees}
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
