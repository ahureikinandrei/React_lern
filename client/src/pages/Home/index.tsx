import React, { FC, useEffect } from 'react'
import { makeStyles, createStyles } from '@material-ui/core'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { useActions } from '../../hooks/useActions'
import MessageSnackbar from '../../components/MessageSnackbar/MessageSnackbar'
import DragAndDropSpace from '../../components/DrapAndDropSpace/DragAndDropSpace'
import {
    DEGREES_FAHRENHEIT,
    KEY_TOKEN_IN_LOCAL_STORAGE,
    KEY_UNITS_IN_LOCAL_STORAGE,
    ThemesEnum,
} from '../../config/constants'
import BackgroundImage from '../../assets/image/main/world_map.jpg'
import BackgroundImageDark from '../../assets/image/main/world_map_dark.jpg'

export const useStylesHome = makeStyles((theme) =>
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

const Home: FC = () => {
    const classes = useStylesHome()
    const { auth, getWeatherInCurrentLocation, switchUnits } = useActions()

    useEffect(() => {
        const token = localStorage.getItem(KEY_TOKEN_IN_LOCAL_STORAGE)
        const units = localStorage.getItem(KEY_UNITS_IN_LOCAL_STORAGE)
        if (token) {
            auth()
        }

        if (units === DEGREES_FAHRENHEIT) {
            switchUnits(DEGREES_FAHRENHEIT)
        }
        getWeatherInCurrentLocation()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={classes.wrapper}>
            <Header />
            <main className={classes.content}>
                <DragAndDropSpace />
            </main>
            <Footer />
            <MessageSnackbar />
        </div>
    )
}

export default Home
