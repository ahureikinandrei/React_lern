import {
    DeleteCard,
    ICard,
    SetNewCardAction,
    SettingsActionEnum,
} from './types'
import { ILocationData } from '../weather/types'
import { AppDispatch } from '../../store'
import UserService from '../../../api/UserService'

export const SettingsActionCreators = {
    setNewCard: (card: ICard): SetNewCardAction => ({
        type: SettingsActionEnum.SET_NEW_CARD,
        payload: card,
    }),
    deleteCard: (id: string): DeleteCard => ({
        type: SettingsActionEnum.DELETE_CARD,
        payload: id,
    }),
    updateCardOrder: (cards: ICard[]) => ({
        type: SettingsActionEnum.UPDATE_CARDS_ORDER,
        payload: cards,
    }),
    updateFavoriteLocationList: (location: ILocationData) => ({
        type: SettingsActionEnum.ADD_TO_FAVORITE,
        payload: location,
    }),
    addToUserFavouritesLocations:
        ({ name, lat, lon, country }: ILocationData) =>
        async (dispatch: AppDispatch) => {
            try {
                const response = await UserService.addCityToFavouritesForUser({
                    name,
                    lat,
                    lon,
                    country,
                })
                console.log(response)
                console.log(dispatch)
            } catch (e) {
                console.log(e)
            }
        },
}
