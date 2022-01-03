import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

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
    return (
        <div className={classes.wrapper}>
            <Header />
            <main className={classes.content} />
            <Footer />
        </div>
    )
}

export default Home
