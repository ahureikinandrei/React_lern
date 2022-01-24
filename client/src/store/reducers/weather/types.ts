export interface IWeatherForecastData {
    datetimeEpoch: number
    temp: number
    humidity: number
    location?: string
}

export interface ILocationData {
    country: string
    lat: number
    lon: number
    name: string
    _id: string
}

export interface IWeatherData {
    address: string
    timezone: string
    latitude: number
    longitude: number
    temp: number
    datetimeEpoch: number
    humidity: number
    windspeed: number
    forecast: IWeatherForecastData[]
    location: ILocationData[]
}

export interface WeatherState {
    searchValue: string
    isLoadingWeather: boolean
    errorWeatherData: string
    weatherData: IWeatherData
    snackbarMessage: string
    unitsDegrees: string
    favouritesLocationsForecastData: Array<IWeatherForecastData[]>
}

export enum WeatherActionEnum {
    SET_IS_LOADING_WEATHER = 'SET_IS_LOADING_WEATHER',
    SET_ERROR_WEATHER_DATA = 'SET_ERROR_WEATHER_DATA',
    SET_SNACKBAR_MESSAGE = 'SET_SNACKBAR_MESSAGE',
    SET_SEARCH_VALUE = 'SET_SEARCH_VALUE',
    SET_WEATHER_DATA = 'SET_WEATHER_DATA',
    SWITCH_UNITS = 'SWITCH_UNITS',
    SET_FAVOURITES_FORECAST_DATA = 'SET_FAVOURITES_FORECAST_DATA',
}

export interface SetIsLoadingWeatherAction {
    type: WeatherActionEnum.SET_IS_LOADING_WEATHER
    payload: boolean
}

export interface SwitchUnits {
    type: WeatherActionEnum.SWITCH_UNITS
    payload: string
}

export interface SetErrorWeatherData {
    type: WeatherActionEnum.SET_ERROR_WEATHER_DATA
    payload: string
}

export interface SetSnackbarMessage {
    type: WeatherActionEnum.SET_SNACKBAR_MESSAGE
    payload: string
}

export interface SetSearchValueAction {
    type: WeatherActionEnum.SET_SEARCH_VALUE
    payload: string
}

export interface SetWeatherData {
    type: WeatherActionEnum.SET_WEATHER_DATA
    payload: IWeatherData
}

export interface SetFavouritesForecastData {
    type: WeatherActionEnum.SET_FAVOURITES_FORECAST_DATA
    payload: IWeatherForecastData[]
}

export type WeatherAction =
    | SetIsLoadingWeatherAction
    | SetSearchValueAction
    | SetWeatherData
    | SetErrorWeatherData
    | SetSnackbarMessage
    | SwitchUnits
    | SetFavouritesForecastData
