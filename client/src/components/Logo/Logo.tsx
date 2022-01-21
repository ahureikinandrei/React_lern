import React, { FC } from 'react'
import { createStyles, makeStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

export const useStyle = makeStyles((theme) =>
    createStyles({
        logo: {
            [theme.breakpoints.down('md')]: {
                display: 'none',
            },
        },
    })
)

const Logo: FC = () => {
    const classes = useStyle()
    return (
        <Typography variant="h4" className={classes.logo}>
            WeatherApp
        </Typography>
    )
}

export default Logo
