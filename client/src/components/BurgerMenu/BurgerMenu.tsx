import React, { FC } from 'react'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Hidden from '@material-ui/core/Hidden'
import { createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() =>
    createStyles({
        icon: {},
    })
)

interface IBurgerMenuProps {
    openDrawer: () => void
}

const BurgerMenu: FC<IBurgerMenuProps> = ({ openDrawer }) => {
    const classes = useStyles()
    return (
        <Hidden smUp>
            <IconButton className={classes.icon} onClick={openDrawer}>
                <MenuIcon />
            </IconButton>
        </Hidden>
    )
}

export default BurgerMenu
