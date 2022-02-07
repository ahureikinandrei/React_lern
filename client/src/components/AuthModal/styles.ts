import { createStyles, makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(() =>
    createStyles({
        modal: {
            borderRadius: 20,
        },
        title: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        closeIcon: {
            fontSize: 26,
        },
    })
)
