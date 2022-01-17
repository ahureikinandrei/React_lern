import {
    WeatherAction,
    WeatherActionEnum,
    WeatherState,
    IWeatherData,
} from './types'

const initialState: WeatherState = {
    searchValue: '',
    isLoadingWeather: false,
    errorWeatherData: '',
    weatherData: {} as IWeatherData,
    snackbarMessage: '',
}

export default function weatherReducer(
    // eslint-disable-next-line default-param-last
    state = initialState,
    action: WeatherAction
): WeatherState {
    switch (action.type) {
        case WeatherActionEnum.SET_IS_LOADING_WEATHER:
            return { ...state, isLoadingWeather: action.payload }
        case WeatherActionEnum.SET_ERROR_WEATHER_DATA:
            return { ...state, errorWeatherData: action.payload }
        case WeatherActionEnum.SET_SNACKBAR_MESSAGE:
            return { ...state, snackbarMessage: action.payload }
        case WeatherActionEnum.SET_SEARCH_VALUE:
            return { ...state, searchValue: action.payload }
        case WeatherActionEnum.SET_WEATHER_DATA:
            return { ...state, weatherData: action.payload }
        default:
            return state
    }
}
