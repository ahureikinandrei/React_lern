import { SettingsActionEnum, SettingsActions, SettingsState } from './types'

const initialState: SettingsState = {
    cards: [],
}

export default function settingsReducer(
    // eslint-disable-next-line default-param-last
    state = initialState,
    action: SettingsActions
): SettingsState {
    switch (action.type) {
        case SettingsActionEnum.SET_NEW_CARD:
            return { ...state, cards: [...state.cards, action.payload] }
        case SettingsActionEnum.UPDATE_CARDS_ORDER:
            return { ...state, cards: action.payload }
        case SettingsActionEnum.DELETE_CARD:
            // eslint-disable-next-line no-case-declarations
            const deleteItemIndex = state.cards.findIndex(
                (card) => card.id === action.payload
            )
            return {
                ...state,
                cards: [
                    ...state.cards.slice(0, deleteItemIndex),
                    ...state.cards.slice(deleteItemIndex + 1),
                ],
            }
        default:
            return state
    }
}
