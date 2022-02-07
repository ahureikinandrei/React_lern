import { createStyles, makeStyles } from '@material-ui/core'
import { ThemesEnum } from '../../config/constants'
import BackgroundImage from '../../assets/image/header/Bg.jpg'
import BackgroundImageDark from '../../assets/image/header/Bg_dark.jpg'

export const useStyles = makeStyles((theme) =>
    createStyles({
        header: {
            position: 'relative',
            height: 180,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 40px',
            backgroundImage:
                theme.palette.type === ThemesEnum.LIGHT_THEME
                    ? `url(${BackgroundImage})`
                    : `url(${BackgroundImageDark})`,
            backgroundSize: 'cover',
            overflow: 'hidden',
            [theme.breakpoints.down('xs')]: {
                flexWrap: 'wrap-reverse',
                padding: '0 20px',
                height: 240,
                justifyContent: 'flex-end',
            },
        },
        headerSettings: {
            display: 'flex',
            alignItems: 'center',
            paddingRight: 40,
            [theme.breakpoints.down('xs')]: {
                display: 'none',
            },
            [theme.breakpoints.down('md')]: {
                flexDirection: 'column',
                minWidth: 90,
            },
        },
        logo: {
            [theme.breakpoints.down('md')]: {
                display: 'none',
            },
        },
        menuIcon: {
            position: 'absolute',
            top: 10,
            right: 10,
        },
    })
)
