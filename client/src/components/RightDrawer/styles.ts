import { createStyles, makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) =>
    createStyles({
        drawerContent: {
            width: 300,
        },
        locationName: {
            flexGrow: 1,
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
            backgroundColor: theme.palette.contrast?.main,
            borderRadius: 8,
            padding: 4,
            marginRight: 8,
        },
        settingsContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingTop: 10,
        },
        authBtnContainer: {
            display: 'flex',
            justifyContent: 'center',
            padding: 10,
        },
    })
)
