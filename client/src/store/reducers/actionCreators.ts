import { AuthActionCreators } from './auth/actionCreators'
import { WeatherActionCreators } from './weather/actionCreators'

export const allActionCreators = {
    ...AuthActionCreators,
    ...WeatherActionCreators,
}
