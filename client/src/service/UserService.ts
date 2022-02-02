import { AxiosResponse } from 'axios'
import axios from '../core/axios'
import { ILocationPropsForAPI, IUserFavouritesServiceResponse } from './types'

export default class UserService {
    static getUsers(): Promise<AxiosResponse> {
        return axios.get('api/user')
    }

    static createUser(email: string, password: string): Promise<AxiosResponse> {
        const body = {
            email,
            password,
        }

        return axios.post('/api/user', body)
    }

    static addLocationToFavouritesForUser({
        name,
        lat,
        lon,
        country,
    }: ILocationPropsForAPI): Promise<
        AxiosResponse<IUserFavouritesServiceResponse>
    > {
        const body = {
            name,
            lat,
            lon,
            country,
        }

        return axios.patch('/api/user', body)
    }

    static removeLocationFromFavouritesForUser(
        id: string
    ): Promise<AxiosResponse<IUserFavouritesServiceResponse>> {
        const body = {
            id,
        }

        return axios.patch('/api/user/remove', body)
    }
}
