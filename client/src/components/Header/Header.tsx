import React, { FC } from 'react'
import { createStyles, makeStyles } from '@material-ui/core'
import { Theme } from '@material-ui/core/styles'
import Logo from '../Logo/Logo'
import WeatherInfo from '../WeatherInfo/WeatherInfo'
import SearchForm from '../SearchForm/SearchForm'
import SwitchSystem from '../Switch/SwitchSystem'
import MainButton from '../MainButton/MainButton'

export const useStylesHeader = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            height: 180,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 40px',
            backgroundColor: '#E4DFD6',
        },
        headerSettings: {
            display: 'flex',
            alignItems: 'center',
            [theme.breakpoints.down('md')]: {
                flexDirection: 'column',
            },
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
            <div className={classes.headerSettings}>
                <SwitchSystem />
                <MainButton title="Sign In" />
            </div>
        </header>
    )
}

export default Header
