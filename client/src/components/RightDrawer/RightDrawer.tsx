import React, { FC } from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles({
    drawerContent: {
        width: 250,
    },
})

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
    const classes = useStyles()

    return (
        <SwipeableDrawer
            anchor="right"
            open={drawerState}
            onClose={closeDrawer}
            onOpen={openDrawer}
        >
            <div className={classes.drawerContent}>
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
            </div>
        </SwipeableDrawer>
    )
}

export default RightDrawer
