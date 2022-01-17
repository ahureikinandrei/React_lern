import { createSelector } from 'reselect'
import { selectError, selectMessage } from './auth/selectors'
import { selectSnackbarMessage } from './weather/selectors'

interface ISnackbarData {
    message: string
    severityError: boolean
}

export const selectSnackbarData = createSelector(
    [selectError, selectMessage, selectSnackbarMessage],
    (error, message, weatherMessage): ISnackbarData => {
        if (error) {
            return { severityError: true, message: error }
        }
        if (message) {
            return { severityError: false, message }
        }
        if (weatherMessage) {
            return { severityError: true, message: weatherMessage }
        }
        return { severityError: true, message: '' }
    }
)
