import { ILocationData } from '../store/reducers/weather/types'

export interface IGeolocationResponse {
    latitude: number
    longitude: number
}

export interface IGeolocationErrorResponse {
    code: number
    message: string
}

interface IUserWhitFavourite {
    cities: ILocationData[]
    email: string
}

export interface IUserFavouritesServiceResponse {
    data: IUserWhitFavourite
}

export interface ILocationPropsForAPI {
    country: string
    lat: number
    lon: number
    name: string
}
