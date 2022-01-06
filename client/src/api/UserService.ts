import axios, { AxiosResponse } from 'axios'
import { IAxiosDataResponse } from './types'

export default class UserService {
    static async getUsers(): Promise<AxiosResponse<IAxiosDataResponse>> {
        return axios.get<IAxiosDataResponse>('http://localhost:5000/api/user')
    }

    static async getUser(
        email: string,
        password: string
    ): Promise<AxiosResponse<IAxiosDataResponse>> {
        const body = {
            email,
            password,
        }

        return axios.post<IAxiosDataResponse>(
            'http://localhost:5000/api/auth/login',
            body
        )
    }
}
