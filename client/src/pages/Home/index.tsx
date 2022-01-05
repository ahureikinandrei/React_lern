import React, { FC, useEffect } from 'react'
import { makeStyles, createStyles } from '@material-ui/core'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
// import { useActions } from '../../hooks/useActions'

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

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            console.log(1)
        }
    })

    return (
        <div className={classes.wrapper}>
            <Header />
            <main className={classes.content} />
            <Footer />
        </div>
    )
}

export default Home
