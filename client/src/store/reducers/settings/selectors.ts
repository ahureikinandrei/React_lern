import { RootState } from '../../store'
import { SettingsState } from './types'

export const selectAuthIsLoading = (state: RootState): SettingsState['cards'] =>
    state.settings.cards

export const selectFavoriteLocations = (
    state: RootState
): SettingsState['favoritesLocation'] => state.settings.favoritesLocation
