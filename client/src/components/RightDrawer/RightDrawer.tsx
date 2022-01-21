import React, { FC } from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { Close } from '@material-ui/icons'
import Typography from '@material-ui/core/Typography'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { selectFavouritesLocations } from '../../store/reducers/settings/selectors'
import { useActions } from '../../hooks/useActions'

const useStyles = makeStyles({
    drawerContent: {
        width: 250,
    },
    LocationName: {
        flexGrow: 1,
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
    const favouritesLocations = useTypedSelector(selectFavouritesLocations)
    const { removeFromUserFavouritesLocations } = useActions()

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
            <List>
                {!favouritesLocations.length ? (
                    <ListItem>You have no favourites locations</ListItem>
                ) : (
                    favouritesLocations.map((item) => (
                        <ListItem key={item._id}>
                            <Typography
                                className={classes.LocationName}
                                variant="h5"
                            >
                                {item.name}
                            </Typography>
                            <IconButton
                                onClick={() =>
                                    removeFromUserFavouritesLocations(item._id)
                                }
                            >
                                <Close />
                            </IconButton>
                        </ListItem>
                    ))
                )}
            </List>
        </SwipeableDrawer>
    )
}

export default RightDrawer
