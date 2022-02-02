import { createStyles, makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) =>
    createStyles({
        wrapper: {
            minWidth: 180,
            overflow: 'hidden',
            fontSize: 16,
            padding: 10,
            borderRadius: 20,
            backgroundColor: theme.palette.whiteBackground.main,
            [theme.breakpoints.down('xs')]: {
                width: '100%',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                fontSize: 12,
                flexWrap: 'wrap',
                '& h6': {
                    marginRight: 5,
                    marginLeft: 5,
                },
            },
        },
        city: { fontSize: '1.5em', lineHeight: 1.2 },
        temperature: { fontSize: '1.5em', lineHeight: 1.2, fontWeight: 600 },
        subInformation: {
            paddingTop: 5,
            fontSize: '0.875em',
            lineHeight: 1.2,
            display: 'flex',
            alignItems: 'center',
        },
        subInformationIcon: {
            paddingRight: 5,
            paddingBottom: 2,
            stroke: theme.palette.text.primary,
            strokeWidth: 1,
        },
        status: {
            minWidth: 180,
            textAlign: 'center',
            fontSize: '1.5em',
            [theme.breakpoints.down('xs')]: {
                width: '100%',
            },
        },
    })
)
