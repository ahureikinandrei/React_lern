import { createStyles, makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(() =>
    createStyles({
        settings: {
            display: 'flex',
            height: 200,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
        },
    })
)
