import { createStyles, makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) =>
    createStyles({
        locationName: {
            flexGrow: 1,
            border: '1px solid rgba(0, 0, 0, 0.23)',
            borderRadius: theme.shape.borderRadius,
            padding: 5,
        },
        loader: {
            justifyContent: 'center',
        },
        chartIconActive: {
            borderRadius: 8,
            padding: 4,
            marginRight: 8,
            backgroundColor: theme.palette.primary.main,
        },
        chartIconDisable: {
            backgroundColor: theme.palette.contrast.main,
            borderRadius: 8,
            padding: 4,
            marginRight: 8,
        },
    })
)
