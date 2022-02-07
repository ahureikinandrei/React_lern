import React, { FC, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import WeatherInfo from '../WeatherInfo/WeatherInfo'
import SearchForm from '../SearchForm/SearchForm'
import RightDrawer from '../RightDrawer/RightDrawer'
import SwitcherUnits from '../SwitcherUnits/SwitcherUnits'
import AuthBtn from '../AuthBtn/AuthBtn'
import { useStyles } from './styles'

const Header: FC = () => {
    const { header, headerSettings, logo, menuIcon } = useStyles()
    const [drawerState, setDrawerState] = useState(false)

    const openDrawer = (): void => {
        setDrawerState(true)
    }

    const closeDrawer = (): void => {
        setDrawerState(false)
    }

    return (
        <header className={header}>
            <Typography variant="h4" className={logo}>
                WeatherApp
            </Typography>
            <WeatherInfo />
            <SearchForm />
            <div className={headerSettings}>
                <SwitcherUnits />
                <AuthBtn />
            </div>
            <IconButton className={menuIcon} onClick={openDrawer}>
                <MenuIcon />
            </IconButton>
            <RightDrawer
                drawerState={drawerState}
                openDrawer={openDrawer}
                closeDrawer={closeDrawer}
            />
        </header>
    )
}

export default Header
