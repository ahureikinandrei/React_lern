import React, { FC } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Clock from '../Clock/Clock'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { ReactComponent as Drop } from '../../assets/icons/drop.svg'
import { ReactComponent as Wind } from '../../assets/icons/wind.svg'
import { useStyles } from './styles'
import {
    selectErrorWeatherData,
    selectIsLoadingWeather,
    selectTempInUnits,
    selectWeatherData,
    selectWeatherUnits,
} from '../../store/reducers/weather/selectors'

const WeatherInfo: FC = () => {
    const { status, wrapper, city, subInformation, subInformationIcon } =
        useStyles()
    const data = useTypedSelector(selectWeatherData)
    const loading = useTypedSelector(selectIsLoadingWeather)
    const error = useTypedSelector(selectErrorWeatherData)
    const unitsDegrees = useTypedSelector(selectWeatherUnits)
    const temp = useTypedSelector(selectTempInUnits)

    if (loading) {
        return (
            <Typography variant="h3" className={status}>
                Loading...
            </Typography>
        )
    }

    if (error) {
        return (
            <Typography variant="h3" className={status}>
                {error}
            </Typography>
        )
    }

    return (
        <Box boxShadow={3} className={wrapper}>
            <Typography variant="subtitle1" className={city}>
                {data.address}
            </Typography>
            <Clock timezone={data.timezone} />
            <Typography variant="h4">
                {temp} {unitsDegrees}
            </Typography>
            <Typography variant="h6" className={subInformation}>
                <Wind className={subInformationIcon} />
                Wind {data.windspeed} km/h
            </Typography>
            <Typography variant="h6" className={subInformation}>
                <Drop className={subInformationIcon} />
                Hum {data.humidity} %
            </Typography>
        </Box>
    )
}

export default WeatherInfo
