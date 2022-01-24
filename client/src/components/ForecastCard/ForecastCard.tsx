import React, { FC } from 'react'
import { Card, createStyles, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { unixToDay } from '../../utils/dateUtils'
import { DD_MM_DATE_FORMAT } from '../../config/constants'

interface IForecastCardProps {
    temp: number
    humidity: number
    datetimeEpoch: number
    unitsDegrees: string
    timezone: string
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
        },
    })
)

const ForecastCard: FC<IForecastCardProps> = ({
    temp,
    humidity,
    datetimeEpoch,
    unitsDegrees,
    timezone,
}) => {
    const classes = useStylesForecastCard()

    return (
        <Card className={classes.card}>
            <Typography variant="h5">
                {temp} {unitsDegrees}
            </Typography>
            <Typography variant="h5" className={classes.textAlign}>
                {unixToDay(datetimeEpoch, timezone, DD_MM_DATE_FORMAT)}
            </Typography>
            <Typography variant="h5">{humidity} %</Typography>
        </Card>
    )
}

export default ForecastCard
