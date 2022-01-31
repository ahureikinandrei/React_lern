import { AuthActionCreators } from './auth/actionCreators'
import { WeatherActionCreators } from './weather/actionCreators'
import { SettingsActionCreators } from './settings/actionsCreators'

export const allActionCreators = {
    ...AuthActionCreators,
    ...WeatherActionCreators,
    ...SettingsActionCreators,
}
