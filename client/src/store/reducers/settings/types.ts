import { ILocationData } from '../weather/types'

export interface ICard {
    id: string
}

export interface IGraphLineData {
    location: string
    color: string
}

export interface SettingsState {
    cards: ICard[]
    favouritesLocations: ILocationData[]
    favouritesLocationsShownOnTheChart: IGraphLineData[]
}

export enum SettingsActionEnum {
    UPDATE_FAVOURITES = 'UPDATE_FAVOURITES',
    UPDATE_CARDS_ORDER = 'UPDATE_CARDS_ORDER',
    SET_NEW_CARD = 'SET_NEW_CARD',
    DELETE_CARD = 'DELETE_CARD',
    ADD_TO_SHOWN_CHART = 'ADD_TO_SHOWN_CHART',
    REMOVE_FROM_SHOWN_CHART = 'REMOVE_FROM_SHOWN_CHART',
    CLEAR_SHOWN_ON_CHART_LOCATION = 'CLEAR_SHOWN_ON_CHART_LOCATION',
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

export interface AddLocationToShownOnTheChart {
    type: SettingsActionEnum.ADD_TO_SHOWN_CHART
    payload: IGraphLineData
}

export interface RemoveLocationFromShownOnTheChart {
    type: SettingsActionEnum.REMOVE_FROM_SHOWN_CHART
    payload: string
}

export interface ClearLocationShownOnTheChart {
    type: SettingsActionEnum.CLEAR_SHOWN_ON_CHART_LOCATION
}

export type SettingsActions =
    | UpdateFavouritesLocations
    | SetNewCardAction
    | DeleteCard
    | UpdateCardsOrder
    | AddLocationToShownOnTheChart
    | RemoveLocationFromShownOnTheChart
    | ClearLocationShownOnTheChart
