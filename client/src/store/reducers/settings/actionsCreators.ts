import {
    DeleteCard,
    ICard,
    SetNewCardAction,
    SettingsActionEnum,
} from './types'

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
}
