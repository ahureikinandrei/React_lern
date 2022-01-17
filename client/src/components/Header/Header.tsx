import React, { FC } from 'react'
import { createStyles, makeStyles } from '@material-ui/core'
import Logo from '../Logo/Logo'
import WeatherInfo from '../WeatherInfo/WeatherInfo'
import SearchForm from '../SearchForm/SearchForm'
import HeaderSettings from '../HeaderSettings/HeaderSettings'

const useStylesHeader = makeStyles(() =>
    createStyles({
        header: {
            height: 180,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 40px',
            backgroundColor: '#E4DFD6',
        },
    })
)

const Header: FC = () => {
    const classes = useStylesHeader()

    return (
        <header className={classes.header}>
            <Logo />
            <WeatherInfo />
            <SearchForm />
            <HeaderSettings />
        </header>
    )
}

export default Header
