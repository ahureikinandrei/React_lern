import React, { FC } from 'react'
import { createStyles, makeStyles, Typography } from '@material-ui/core'
import NearMeOutlinedIcon from '@material-ui/icons/NearMeOutlined'

export const useStylesWeatherInfo = makeStyles(() =>
    createStyles({
        wrapper: { minWidth: 240 },
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

    return (
        <div className={classes.wrapper}>
            <Typography variant="subtitle1" className={classes.city}>
                Minsk
            </Typography>
            <Typography variant="subtitle1" className={classes.date}>
                Thursday | 16:45 am
            </Typography>
            <Typography variant="subtitle1" className={classes.temperature}>
                12°C
            </Typography>
            <Typography variant="subtitle1" className={classes.subInformation}>
                <NearMeOutlinedIcon className={classes.subInformationIcon} />
                Wind 10 km/h
            </Typography>
            <Typography variant="subtitle1" className={classes.subInformation}>
                <NearMeOutlinedIcon className={classes.subInformationIcon} />
                Hum 54 %
            </Typography>
            <Typography variant="subtitle1" className={classes.subInformation}>
                <NearMeOutlinedIcon className={classes.subInformationIcon} />
                Rain 0.2 %
            </Typography>
        </div>
    )
}

export default WeatherInfo
