import { AxiosResponse } from 'axios'
import axios from '../core/axios'
import { ILocationData } from '../store/reducers/weather/types'

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

    static addCityToFavouritesForUser({
        name,
        lat,
        lon,
        country,
    }: ILocationData): Promise<AxiosResponse> {
        const body = {
            name,
            lat,
            lon,
            country,
        }

        return axios.patch('/api/user', body)
    }
}
