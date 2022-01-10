import { AxiosResponse } from 'axios'
import axios from '../core/axios'

export default class AuthService {
    static async validateUserToken(): Promise<AxiosResponse> {
        const response = await axios.get('api/auth/me')

        return response
    }

    static async getUser(
        email: string,
        password: string
    ): Promise<AxiosResponse> {
        const body = {
            email,
            password,
        }

        return axios.post('/api/auth/login', body)
    }
}
