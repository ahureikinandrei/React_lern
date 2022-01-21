import { ILocationData } from '../weather/types'

export interface ICard {
    id: string
}

export interface SettingsState {
    cards: ICard[]
    favouritesLocations: ILocationData[]
}

export enum SettingsActionEnum {
    UPDATE_FAVOURITES = 'UPDATE_FAVOURITES',
    UPDATE_CARDS_ORDER = 'UPDATE_CARDS_ORDER',
    SET_NEW_CARD = 'SET_NEW_CARD',
    DELETE_CARD = 'DELETE_CARD',
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

export interface UpdateFavouritesLocations {
    type: SettingsActionEnum.UPDATE_FAVOURITES
    payload: ILocationData[]
}

export type SettingsActions =
    | UpdateFavouritesLocations
    | SetNewCardAction
    | DeleteCard
    | UpdateCardsOrder
