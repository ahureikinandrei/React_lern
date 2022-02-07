import { createStyles, makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) =>
    createStyles({
        card: {
            position: 'relative',
            minWidth: 300,
            height: 285,
            borderRadius: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.palette.secondary.main,
        },
        table: {
            paddingLeft: 20,
        },
        settings: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingRight: 10,
        },
        icon: {
            position: 'absolute',
            top: 15,
            right: 20,
        },
    })
)
