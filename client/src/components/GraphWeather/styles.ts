import { createStyles, makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(() =>
    createStyles({
        cartWrapper: {
            width: '100%',
            height: 180,
        },
        setting: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: 5,
        },
        settingBtn: {
            width: 50,
        },
    })
)
