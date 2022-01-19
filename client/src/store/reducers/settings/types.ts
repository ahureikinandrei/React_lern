import { ILocationData } from '../weather/types'

export interface ICard {
    id: string
}

export interface SettingsState {
    cards: ICard[]
    favoritesLocation: ILocationData[]
}

export enum SettingsActionEnum {
    SET_NEW_CARD = 'SET_NEW_CARD',
    DELETE_CARD = 'DELETE_CARD',
    UPDATE_CARDS_ORDER = 'UPDATE_CARDS_ORDER',
    ADD_TO_FAVORITE = 'ADD_TO_FAVORITE',
}

export interface SetNewCardAction {
    type: SettingsActionEnum.SET_NEW_CARD
    payload: ICard
}

export interface DeleteCard {
    type: SettingsActionEnum.DELETE_CARD
    payload: string
}

export interface UpdateCardsOrder {
    type: SettingsActionEnum.UPDATE_CARDS_ORDER
    payload: ICard[]
}

export interface UpdateFavoriteLocation {
    type: SettingsActionEnum.ADD_TO_FAVORITE
    payload: ILocationData
}

export type SettingsActions =
    | SetNewCardAction
    | DeleteCard
    | UpdateCardsOrder
    | UpdateFavoriteLocation
