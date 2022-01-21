import { RootState } from '../../store'
import { SettingsState } from './types'

export const selectAuthIsLoading = (state: RootState): SettingsState['cards'] =>
    state.settings.cards

export const selectFavouritesLocations = (
    state: RootState
): SettingsState['favouritesLocations'] => state.settings.favouritesLocations
