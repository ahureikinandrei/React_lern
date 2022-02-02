import React, { FC, useEffect } from 'react'
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
import { useStyles } from './styles'

const Home: FC = () => {
    const { wrapper, content } = useStyles()
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
    }, [])

    return (
        <div className={wrapper}>
            <Header />
            <main className={content}>
                <DragAndDropSpace />
            </main>
            <Footer />
            <MessageSnackbar />
        </div>
    )
}

export default Home
