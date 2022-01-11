import React, { FC, useEffect } from 'react'
import { makeStyles, createStyles } from '@material-ui/core'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { useActions } from '../../hooks/useActions'
import MessageSnackbar from '../../components/MessageSnackbar/MessageSnackbar'
import WeatherService from '../../api/WeatherService'

export const useStylesHome = makeStyles(() =>
    createStyles({
        wrapper: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
        },
        content: {
            backgroundColor: 'white',
            flex: '1 0 auto',
        },
    })
)

const Home: FC = () => {
    const classes = useStylesHome()
    const { auth } = useActions()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            auth()
        }
        WeatherService.getCurrentWeather()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={classes.wrapper}>
            <Header />
            <main className={classes.content} />
            <Footer />
            <MessageSnackbar />
        </div>
    )
}

export default Home
