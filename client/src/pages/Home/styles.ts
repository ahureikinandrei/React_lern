import { createStyles, makeStyles } from '@material-ui/core'
import { ThemesEnum } from '../../config/constants'
import BackgroundImage from '../../assets/image/main/world_map.jpg'
import BackgroundImageDark from '../../assets/image/main/world_map_dark.jpg'

export const useStyles = makeStyles((theme) =>
    createStyles({
        wrapper: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
        },
        content: {
            maxWidth: 1024,
            width: '100%',
            flex: '1 0 0',
            boxSizing: 'border-box',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingLeft: 16,
            paddingRight: 16,
            paddingBottom: 16,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundImage:
                theme.palette.type === ThemesEnum.LIGHT_THEME
                    ? `url(${BackgroundImage})`
                    : `url(${BackgroundImageDark})`,
        },
    })
)
