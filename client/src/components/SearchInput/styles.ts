import { createStyles, makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) =>
    createStyles({
        form: {
            display: 'flex',
            alignItems: 'center',
        },
        input: {
            margin: theme.spacing(1),
            width: '40ch',
            [theme.breakpoints.down('sm')]: {
                order: -1,
            },
        },
        searchBtn: {
            height: 50,
            border: '1px solid rgba(0, 0, 0, 0.23)',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.whiteBackground.main,
            marginRight: 12,
        },
        icon: {
            fontSize: theme.spacing(3),
        },
    })
)
