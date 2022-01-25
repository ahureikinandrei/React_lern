import { AxiosError } from 'axios'
import {
    AddLocationToShownOnTheChart,
    ClearLocationShownOnTheChart,
    DeleteCard,
    ICard,
    RemoveLocationFromShownOnTheChart,
    SetNewCardAction,
    SettingsActionEnum,
    UpdateCardsOrder,
    UpdateFavouritesLocations,
} from './types'
import { AppDispatch } from '../../store'
import UserService from '../../../api/UserService'
import { ILocationData } from '../weather/types'
import { WeatherActionCreators } from '../weather/actionCreators'
import { randomColor } from '../../../utils/generalUtils'

export const SettingsActionCreators = {
    setNewCard: (card: ICard): SetNewCardAction => ({
        type: SettingsActionEnum.SET_NEW_CARD,
        payload: card,
    }),
    updateFavorites: (
        locations: ILocationData[]
    ): UpdateFavouritesLocations => ({
        type: SettingsActionEnum.UPDATE_FAVOURITES,
        payload: locations,
    }),
    updateCardOrder: (cards: ICard[]): UpdateCardsOrder => ({
        type: SettingsActionEnum.UPDATE_CARDS_ORDER,
        payload: cards,
    }),
    deleteCard: (id: string): DeleteCard => ({
        type: SettingsActionEnum.DELETE_CARD,
        payload: id,
    }),
    addLocationToShownOnTheChart: (
        locationName: string
    ): AddLocationToShownOnTheChart => ({
        type: SettingsActionEnum.ADD_TO_SHOWN_CHART,
        payload: { location: locationName, color: randomColor() },
    }),
    removeLocationFromShownOnTheChart: (
        name: string
    ): RemoveLocationFromShownOnTheChart => ({
        type: SettingsActionEnum.REMOVE_FROM_SHOWN_CHART,
        payload: name,
    }),
    clearShownOnTheChartLocation: (): ClearLocationShownOnTheChart => ({
        type: SettingsActionEnum.CLEAR_SHOWN_ON_CHART_LOCATION,
    }),
    addToUserFavouritesLocations:
        ({ name, lat, lon, country }: ILocationData) =>
        async (dispatch: AppDispatch) => {
            try {
                const response =
                    await UserService.addLocationToFavouritesForUser({
                        name,
                        lat,
                        lon,
                        country,
                    })
                const { data } = response.data
                if (data && data.cities) {
                    dispatch(
                        SettingsActionCreators.updateFavorites(data.cities)
                    )
                }
            } catch (e) {
                const error = e as AxiosError
                const { response } = error
                if (response && response.data) {
                    const { data } = response.data
                    dispatch(WeatherActionCreators.setErrorWeatherData(data))
                }
            }
        },
    removeFromUserFavouritesLocations:
        (id: string) => async (dispatch: AppDispatch) => {
            try {
                const response =
                    await UserService.removeLocationFromFavouritesForUser(id)
                const { data } = response.data
                if (data && data.cities) {
                    dispatch(
                        SettingsActionCreators.updateFavorites(data.cities)
                    )
                }
            } catch (e) {
                const error = e as AxiosError
                const { response } = error
                if (response && response.data) {
                    const { data } = response.data
                    dispatch(WeatherActionCreators.setErrorWeatherData(data))
                }
            }
        },
}
