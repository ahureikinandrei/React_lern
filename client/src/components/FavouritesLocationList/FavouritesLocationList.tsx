import React, { FC, ReactElement } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import TimelineIcon from '@material-ui/icons/Timeline'
import Typography from '@material-ui/core/Typography'
import Close from '@material-ui/icons/Close'
import { ILocationData } from '../../store/reducers/weather/types'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import {
    selectFavouritesForecastData,
    selectIsLoadingDataForGraph,
} from '../../store/reducers/weather/selectors'
import {
    selectFavouritesLocations,
    selectShownOnGraphLocations,
} from '../../store/reducers/settings/selectors'
import { useActions } from '../../hooks/useActions'
import { useStyles } from './styles'

const FavouritesLocationList: FC = () => {
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
        getWeatherInfoFromQuery,
    } = useActions()

    const { loader, locationName, chartIconActive, chartIconDisable } =
        useStyles()

    if (isLoading) {
        return (
            <ListItem className={loader} key="loader">
                <CircularProgress />
            </ListItem>
        )
    }

    const onLocationClick = (item: ILocationData): void => {
        const { lat, lon } = item
        const query = `${lat},${lon}`
        getWeatherInfoFromQuery(query)
    }

    const showContent = (): ReactElement | ReactElement[] => {
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

        return favouritesLocations.map((item) => {
            const isLocationOnChart = !!locationsOnChart.find(
                ({ location }) => {
                    return location === item.name
                }
            )
            return (
                <ListItem key={item._id}>
                    <IconButton
                        className={
                            isLocationOnChart
                                ? chartIconActive
                                : chartIconDisable
                        }
                        onClick={() => {
                            toggleViewLocationChart(item, isLocationOnChart)
                        }}
                    >
                        <TimelineIcon />
                    </IconButton>
                    <Typography
                        className={locationName}
                        variant="h5"
                        onClick={() => {
                            onLocationClick(item)
                        }}
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
            )
        })
    }

    return (
        <List>
            {!favouritesLocations.length ? (
                <ListItem>You have no favourites locations</ListItem>
            ) : (
                showContent()
            )}
        </List>
    )
}

export default FavouritesLocationList
