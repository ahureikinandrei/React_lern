import { AxiosResponse } from 'axios'
import axios from '../core/axios'

export default class UserService {
    static async getUsers(): Promise<AxiosResponse> {
        return axios.get('api/user')
    }

    static async createUser(
        email: string,
        password: string
    ): Promise<AxiosResponse> {
        const body = {
            email,
            password,
        }

        return axios.post('http://localhost:5000/api/user', body)
    }
}
