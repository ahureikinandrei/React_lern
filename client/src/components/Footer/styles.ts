import { createStyles, makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) =>
    createStyles({
        footer: {
            height: 100,
            flex: '0 0 auto',
            backgroundColor: theme.palette.footer?.main,
            display: 'flex',
            alignItems: 'center',
            padding: '0 40px',
            '& h6': {
                display: 'flex',
                alignItems: 'center',
                color: 'white',
                fontWeight: 700,
                fontSize: 16,
            },
        },
        copyrightIcon: {
            paddingRight: 10,
            fontSize: 32,
        },
    })
)
