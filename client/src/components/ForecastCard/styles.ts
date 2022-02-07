import { createStyles, makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) =>
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
            backgroundColor: theme.palette.whiteBackground.main,
            '& .cls-1, .cls-2, .cls-3, svg': {
                stroke: theme.palette.text.primary,
            },
            '& svg': {
                fill: theme.palette.text.primary,
            },
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
            stroke: theme.palette.text.primary,
        },
    })
)
