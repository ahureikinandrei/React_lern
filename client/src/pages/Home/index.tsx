import React, { FC, useEffect } from 'react'
import { makeStyles, createStyles } from '@material-ui/core'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { useActions } from '../../hooks/useActions'
import MessageSnackbar from '../../components/MessageSnackbar/MessageSnackbar'
import { WeatherCard } from '../../components/WeatherCard/WeatherCard'

export const useStylesHome = makeStyles(() =>
    createStyles({
        wrapper: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
        },
        content: {
            flex: '1 0 0',
            width: '100%',
            boxSizing: 'border-box',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingLeft: 16,
            paddingRight: 16,
            // overflow: 'scroll',
        },
    })
)

const Home: FC = () => {
    const classes = useStylesHome()
    const { auth, getWeatherInCurrentLocation } = useActions()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            auth()
        }
        getWeatherInCurrentLocation()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={classes.wrapper}>
            <Header />
            <main className={classes.content}>
                <WeatherCard />
            </main>
            <Footer />
            <MessageSnackbar />
        </div>
    )
}

export default Home
