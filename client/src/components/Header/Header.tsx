import React, { FC, useState } from 'react'
import { createStyles, makeStyles } from '@material-ui/core'
import Logo from '../Logo/Logo'
import WeatherInfo from '../WeatherInfo/WeatherInfo'
import SearchForm from '../SearchForm/SearchForm'
import HeaderSettings from '../HeaderSettings/HeaderSettings'
import BurgerMenu from '../BurgerMenu/BurgerMenu'
import RightDrawer from '../RightDrawer/RightDrawer'

const useStylesHeader = makeStyles((theme) =>
    createStyles({
        header: {
            position: 'relative',
            height: 180,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 40px',
            backgroundColor: '#E4DFD6',
            overflow: 'hidden',
            [theme.breakpoints.down('xs')]: {
                flexWrap: 'wrap-reverse',
                padding: '0 20px',
                height: 160,
                justifyContent: 'flex-end',
            },
        },
    })
)

const Header: FC = () => {
    const classes = useStylesHeader()
    const [drawerState, setDrawerState] = useState(false)

    const openDrawer = (): void => {
        setDrawerState(true)
    }

    const closeDrawer = (): void => {
        setDrawerState(false)
    }

    return (
        <header className={classes.header}>
            <Logo />
            <WeatherInfo />
            <SearchForm />
            <HeaderSettings />
            <BurgerMenu openDrawer={openDrawer} />
            <RightDrawer
                drawerState={drawerState}
                openDrawer={openDrawer}
                closeDrawer={closeDrawer}
            />
        </header>
    )
}

export default Header
