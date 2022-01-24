import { SettingsActionEnum, SettingsActions, SettingsState } from './types'

const initialState: SettingsState = {
    cards: [],
    favouritesLocations: [],
    favouritesLocationsShownOnTheChart: [],
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
        case SettingsActionEnum.ADD_TO_SHOWN_CHART:
            return {
                ...state,
                favouritesLocationsShownOnTheChart: [
                    ...state.favouritesLocationsShownOnTheChart,
                    action.payload,
                ],
            }
        case SettingsActionEnum.CLEAR_SHOWN_ON_CHART_LOCATION:
            return {
                ...state,
                favouritesLocationsShownOnTheChart: [],
            }
        case SettingsActionEnum.REMOVE_FROM_SHOWN_CHART:
            const deleteLocationIndex =
                state.favouritesLocationsShownOnTheChart.findIndex(
                    (location) => location === action.payload
                )
            return {
                ...state,
                favouritesLocationsShownOnTheChart: [
                    ...state.favouritesLocationsShownOnTheChart.slice(
                        0,
                        deleteLocationIndex
                    ),
                    ...state.favouritesLocationsShownOnTheChart.slice(
                        deleteLocationIndex + 1
                    ),
                ],
            }
        case SettingsActionEnum.UPDATE_FAVOURITES:
            return {
                ...state,
                favouritesLocations: [...action.payload],
            }
        default:
            return state
    }
}
