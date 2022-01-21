import {
    DeleteCard,
    ICard,
    SetNewCardAction,
    SettingsActionEnum,
    UpdateCardsOrder,
    UpdateFavouritesLocations,
} from './types'
import { AppDispatch } from '../../store'
import UserService from '../../../api/UserService'
import { ILocationData } from '../weather/types'

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
                console.log(e)
            }
        },
    removeFromUserFavouritesLocations:
        (id: string) => async (dispatch: AppDispatch) => {
            try {
                const response =
                    await UserService.removeLocationFromFavouritesForUser(id)
                const { data } = response.data
                console.log(data)
                if (data && data.cities) {
                    dispatch(
                        SettingsActionCreators.updateFavorites(data.cities)
                    )
                }
            } catch (e) {
                console.log(e)
            }
        },
}
