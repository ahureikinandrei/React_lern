import { AxiosResponse } from 'axios'
import axios from '../core/axios'

export default class UserService {
    static getUsers(): Promise<AxiosResponse> {
        return axios.get('api/user')
    }

    static createUser(email: string, password: string): Promise<AxiosResponse> {
        const body = {
            email,
            password,
        }

        return axios.post('api/user', body)
    }
}
