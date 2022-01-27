import React, { FC, ReactElement } from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Close from '@material-ui/icons/Close'
import TimelineIcon from '@material-ui/icons/Timeline'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import { createStyles } from '@material-ui/core'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import {
    selectFavouritesLocations,
    selectShownOnGraphLocations,
} from '../../store/reducers/settings/selectors'
import { useActions } from '../../hooks/useActions'
import {
    selectFavouritesForecastData,
    selectIsLoadingDataForGraph,
} from '../../store/reducers/weather/selectors'
import { ILocationData } from '../../store/reducers/weather/types'
import SwitcherThemes from '../SwitcherThems/SwitcherThemes'

const useStyles = makeStyles((theme) =>
    createStyles({
        drawerContent: {
            width: 300,
        },
        locationName: {
            flexGrow: 1,
        },
        loader: {
            justifyContent: 'center',
        },
        active: {
            borderRadius: 8,
            padding: 4,
            marginRight: 8,
            backgroundColor: theme.palette.primary.main,
        },
        disable: {
            backgroundColor: theme.palette.contrast.main,
            borderRadius: 8,
            padding: 4,
            marginRight: 8,
        },
    })
)

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
    const { loader, locationName, active, disable, drawerContent } = useStyles()
    const isLoading = useTypedSelector(selectIsLoadingDataForGraph)
    const favouritesLocations = useTypedSelector(selectFavouritesLocations)
    const locationsOnChart = useTypedSelector(selectShownOnGraphLocations)
    const locationsOnChartWithData = useTypedSelector(
        selectFavouritesForecastData
    )
    const {
        removeFromUserFavouritesLocations,
        addLocationToShownOnTheChart,
        getWeatherInfoForGraphs,
        removeLocationFromShownOnTheChart,
    } = useActions()

    const toggleViewLocationChart = (
        item: ILocationData,
        isLocationOnChart: boolean
    ): void => {
        if (isLocationOnChart) {
            removeLocationFromShownOnTheChart(item.name)
            return
        }

        if (
            locationsOnChartWithData.some((data) => {
                const [firstForecastDay] = data
                return item.name === firstForecastDay.location
            })
        ) {
            addLocationToShownOnTheChart(item.name)
            return
        }
        getWeatherInfoForGraphs(item, true)
    }

    const showContent = (): ReactElement | ReactElement[] => {
        if (isLoading) {
            return (
                <ListItem className={loader} key="loader">
                    <CircularProgress />
                </ListItem>
            )
        }
        return favouritesLocations.map((item) => {
            const isLocationOnChart = !!locationsOnChart.find(
                ({ location }) => {
                    return location === item.name
                }
            )
            return (
                <ListItem key={item._id}>
                    <IconButton
                        className={isLocationOnChart ? active : disable}
                        onClick={() => {
                            toggleViewLocationChart(item, isLocationOnChart)
                        }}
                    >
                        <TimelineIcon />
                    </IconButton>
                    <Typography className={locationName} variant="h5">
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
            )
        })
    }

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
                <SwitcherThemes />
                <Divider />
            </div>
            <List>
                {!favouritesLocations.length ? (
                    <ListItem>You have no favourites locations</ListItem>
                ) : (
                    showContent()
                )}
            </List>
        </SwipeableDrawer>
    )
}

export default RightDrawer
