import React, { FC, ReactElement, useState } from 'react'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Close from '@material-ui/icons/Close'
import TableWeather from '../TableWeather/TableWeather'
import WeatherCardSettings from '../WeatherCardSettings/WeatherCardSettings'
import InteractiveMap from '../InteractiveMap/InteractiveMap'
import GraphWeather from '../GraphWeather/GraphWeather'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useActions'
import { MAP_BTN_TEXT, TABLE_BTN_TEXT } from '../../config/constants'
import { selectShownOnGraphLocations } from '../../store/reducers/settings/selectors'
import { useStyles } from './styles'
import {
    selectFavouritesForecastDataInUnits,
    selectTimezone,
    selectWeatherForecastInUnits,
    selectWeatherUnits,
} from '../../store/reducers/weather/selectors'

interface IWeatherCardProps {
    id: string
}

export const WeatherCard: FC<IWeatherCardProps> = React.memo(({ id }) => {
    const [viewState, changeViewState] = useState(TABLE_BTN_TEXT)
    const { card, table, settings, icon } = useStyles()
    const forecast = useTypedSelector(selectWeatherForecastInUnits)
    const timezone = useTypedSelector(selectTimezone)
    const unitsDegrees = useTypedSelector(selectWeatherUnits)
    const favouritesForecastData = useTypedSelector(
        selectFavouritesForecastDataInUnits
    )
    const shownOnGraphLocations = useTypedSelector(selectShownOnGraphLocations)

    const { deleteCard } = useActions()
    const deleteCardClick = (): void => {
        deleteCard(id)
    }

    const swapViewMod = (value: string): void => {
        changeViewState(value)
    }

    const renderContent = (viewState: string): ReactElement => {
        if (viewState === TABLE_BTN_TEXT) {
            return (
                <TableWeather
                    forecast={forecast}
                    timezone={timezone}
                    unitsDegrees={unitsDegrees}
                />
            )
        }

        if (viewState === MAP_BTN_TEXT) {
            return <InteractiveMap />
        }

        return (
            <GraphWeather
                forecast={forecast}
                timezone={timezone}
                unitsDegrees={unitsDegrees}
                favouritesForecastData={favouritesForecastData}
                shownOnGraphLocations={shownOnGraphLocations}
            />
        )
    }

    return (
        <Card className={card}>
            <Grid container>
                <Grid className={table} item xs={9} sm={10}>
                    {renderContent(viewState)}
                </Grid>
                <Grid className={settings} item xs={3} sm={2}>
                    <WeatherCardSettings
                        swapViewMod={swapViewMod}
                        viewState={viewState}
                    />
                </Grid>
                <IconButton
                    className={icon}
                    onClick={deleteCardClick}
                    aria-label="delete"
                >
                    <Close />
                </IconButton>
            </Grid>
        </Card>
    )
})
