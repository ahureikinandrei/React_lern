import { RootState } from '../../store'
import { SettingsState } from './types'

export const selectTheme = (state: RootState): SettingsState['theme'] =>
    state.settings.theme

export const selectStatusZipCodeApi = (
    state: RootState
): SettingsState['isZipCodeApiNeed'] => state.settings.isZipCodeApiNeed

export const selectAuthIsLoading = (state: RootState): SettingsState['cards'] =>
    state.settings.cards

export const selectFavouritesLocations = (
    state: RootState
): SettingsState['favouritesLocations'] => state.settings.favouritesLocations

export const selectShownOnGraphLocations = (
    state: RootState
): SettingsState['favouritesLocationsShownOnTheChart'] =>
    state.settings.favouritesLocationsShownOnTheChart
