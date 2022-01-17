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
} from '../../config/constants'

export const useStylesHome = makeStyles(() =>
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
