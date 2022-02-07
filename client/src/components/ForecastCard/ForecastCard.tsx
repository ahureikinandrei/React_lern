import React, { FC, ReactElement } from 'react'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import { unixToDay } from '../../utils/dateUtils'
import { DD_MM_DATE_FORMAT } from '../../config/constants'
import {
    WeatherIconList,
    WeatherIconsTitle,
} from '../WeatherIcons/WeatherIcons'
import { ReactComponent as Drop } from '../../assets/icons/drop.svg'
import { useStyles } from './styles'

interface IForecastCardProps {
    temp: number
    humidity: number
    datetimeEpoch: number
    unitsDegrees: string
    timezone: string
    icon: string
}

const ForecastCard: FC<IForecastCardProps> = ({
    temp,
    humidity,
    datetimeEpoch,
    unitsDegrees,
    timezone,
    icon,
}) => {
    const { card, textAlign, weatherIcon, humidityIcon } = useStyles()

    const findIcon = (icon: string): ReactElement => {
        return (
            WeatherIconList[icon] ||
            WeatherIconList[WeatherIconsTitle.CLOUDY_DAY]
        )
    }

    return (
        <Card className={card}>
            <Typography variant="h5">
                {temp} {unitsDegrees}
            </Typography>
            <Typography variant="h5" className={textAlign}>
                {unixToDay(datetimeEpoch, timezone, DD_MM_DATE_FORMAT)}
            </Typography>
            <div className={weatherIcon}>{findIcon(icon)}</div>
            <Typography variant="h6">
                <Drop className={humidityIcon} />
                {humidity} %
            </Typography>
        </Card>
    )
}

export default ForecastCard
