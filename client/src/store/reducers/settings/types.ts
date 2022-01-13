export interface ICard {
    id: string
}

export interface SettingsState {
    cards: ICard[]
}

export enum SettingsActionEnum {
    SET_NEW_CARD = 'SET_NEW_CARD',
    DELETE_CARD = 'DELETE_CARD',
    UPDATE_CARDS_ORDER = 'UPDATE_CARDS_ORDER',
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

export type SettingsActions = SetNewCardAction | DeleteCard | UpdateCardsOrder
