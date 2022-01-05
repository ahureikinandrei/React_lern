import axios, { AxiosResponse } from 'axios'
import { IAxiosDataResponse } from './types'

export default class AuthService {
    static async getUsers(): Promise<AxiosResponse<IAxiosDataResponse>> {
        return axios.get<IAxiosDataResponse>('http://localhost:5000/api/user')
    }
}
