import React, { FC } from 'react'
import { createStyles, makeStyles } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import {
    selectErrorWeatherData,
    selectIsLoadingWeather,
    selectTempInUnits,
    selectWeatherData,
    selectWeatherUnits,
} from '../../store/reducers/weather/selectors'
import Clock from '../Clock/Clock'
import { ReactComponent as Drop } from '../../assets/icons/drop.svg'
import { ReactComponent as Wind } from '../../assets/icons/wind.svg'

export const useStylesWeatherInfo = makeStyles((theme) =>
    createStyles({
        wrapper: {
            minWidth: 180,
            overflow: 'hidden',
            fontSize: 16,
            padding: 10,
            borderRadius: 20,
            backgroundColor: theme.palette.whiteBackground.main,
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
            paddingBottom: 2,
            stroke: theme.palette.text.primary,
            strokeWidth: 1,
        },
        status: {
            width: '100%',
            minWidth: 180,
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
        <Box boxShadow={3} className={classes.wrapper}>
            <Typography variant="subtitle1" className={classes.city}>
                {data.address}
            </Typography>
            <Clock timezone={data.timezone} />
            <Typography variant="h4">
                {temp} {unitsDegrees}
            </Typography>
            <Typography variant="h6" className={classes.subInformation}>
                <Wind className={classes.subInformationIcon} />
                Wind {data.windspeed} km/h
            </Typography>
            <Typography variant="h6" className={classes.subInformation}>
                <Drop className={classes.subInformationIcon} />
                Hum {data.humidity} %
            </Typography>
        </Box>
    )
}

export default WeatherInfo
