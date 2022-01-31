import React, { FC, useState } from 'react'
import { createStyles, makeStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import WeatherInfo from '../WeatherInfo/WeatherInfo'
import SearchForm from '../SearchForm/SearchForm'
import RightDrawer from '../RightDrawer/RightDrawer'
import BackgroundImage from '../../assets/image/header/Bg.jpg'
import BackgroundImageDark from '../../assets/image/header/Bg_dark.jpg'
import { ThemesEnum } from '../../config/constants'
import SwitcherUnits from '../SwitcherUnits/SwitcherUnits'
import AuthBtn from '../AuthBtn/AuthBtn'

const useStylesHeader = makeStyles((theme) =>
    createStyles({
        header: {
            position: 'relative',
            height: 180,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 40px',
            backgroundImage:
                theme.palette.type === ThemesEnum.LIGHT_THEME
                    ? `url(${BackgroundImage})`
                    : `url(${BackgroundImageDark})`,
            backgroundSize: 'cover',
            overflow: 'hidden',
            [theme.breakpoints.down('xs')]: {
                flexWrap: 'wrap-reverse',
                padding: '0 20px',
                height: 240,
                justifyContent: 'flex-end',
            },
        },
        headerSettings: {
            display: 'flex',
            alignItems: 'center',
            paddingRight: 40,
            [theme.breakpoints.down('xs')]: {
                display: 'none',
            },
            [theme.breakpoints.down('md')]: {
                flexDirection: 'column',
                minWidth: 90,
            },
        },
        logo: {
            [theme.breakpoints.down('md')]: {
                display: 'none',
            },
        },
        menuIcon: {
            position: 'absolute',
            top: 10,
            right: 10,
        },
    })
)

const Header: FC = () => {
    const { header, headerSettings, logo, menuIcon } = useStylesHeader()
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
