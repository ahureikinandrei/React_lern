import React, { FC } from 'react'
import { Card, createStyles, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { unixToDay } from '../../utils/dateUtils'

interface IForecastCardProps {
    temp: number
    humidity: number
    datetimeEpoch: number
}

const useStylesForecastCard = makeStyles((theme) =>
    createStyles({
        card: {
            width: 110,
            height: 200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
            borderRadius: 20,
            backgroundColor: theme.palette.primary.main,
        },
    })
)

const ForecastCard: FC<IForecastCardProps> = ({
    temp,
    humidity,
    datetimeEpoch,
}) => {
    const classes = useStylesForecastCard()

    return (
        <Card className={classes.card}>
            <Typography variant="h5">{temp} °C</Typography>
            <Typography variant="h4">
                {unixToDay(datetimeEpoch, true)}
            </Typography>
            <Typography variant="h5">{humidity} %</Typography>
        </Card>
    )
}

export default ForecastCard
