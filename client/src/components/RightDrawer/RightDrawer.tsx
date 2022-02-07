import React, { FC } from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Divider from '@material-ui/core/Divider'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import IconButton from '@material-ui/core/IconButton'
import SwitcherThemes from '../SwitcherThems/SwitcherThemes'
import SwitcherUnits from '../SwitcherUnits/SwitcherUnits'
import AuthBtn from '../AuthBtn/AuthBtn'
import ZipCodeCheckbox from '../ZipCodeCheckbox/ZIpCodeCheckbox'
import { useStyles } from './styles'
import FavouritesLocationList from '../FavouritesLocationList/FavouritesLocationList'

interface IRightDrawerProps {
    drawerState: boolean
    openDrawer: () => void
    closeDrawer: () => void
}

const RightDrawer: FC<IRightDrawerProps> = ({
    drawerState,
    openDrawer,
    closeDrawer,
}) => {
    const { drawerContent, settingsContainer, authBtnContainer } = useStyles()

    return (
        <SwipeableDrawer
            anchor="right"
            open={drawerState}
            onClose={closeDrawer}
            onOpen={openDrawer}
        >
            <div className={drawerContent}>
                <div
                    onClick={closeDrawer}
                    onKeyPress={closeDrawer}
                    role="button"
                    tabIndex={0}
                >
                    <IconButton>
                        <ChevronRightIcon />
                    </IconButton>
                </div>
                <Divider />
                <div className={authBtnContainer}>
                    <AuthBtn />
                </div>
                <Divider />
                <div className={settingsContainer}>
                    <SwitcherThemes />
                    <SwitcherUnits />
                    <ZipCodeCheckbox />
                </div>
                <Divider />
                <FavouritesLocationList />
            </div>
        </SwipeableDrawer>
    )
}

export default RightDrawer
