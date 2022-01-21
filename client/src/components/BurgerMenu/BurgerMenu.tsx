import React, { FC } from 'react'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() =>
    createStyles({
        icon: {
            position: 'absolute',
            top: 10,
            right: 10,
        },
    })
)

interface IBurgerMenuProps {
    openDrawer: () => void
}

const BurgerMenu: FC<IBurgerMenuProps> = ({ openDrawer }) => {
    const classes = useStyles()
    return (
        <IconButton className={classes.icon} onClick={openDrawer}>
            <MenuIcon />
        </IconButton>
    )
}

export default BurgerMenu
