import axios, { AxiosResponse } from 'axios'
import { IAxiosDataResponse } from './types'

export default class AuthService {
    static async validateUserToken(
        token: string
    ): Promise<AxiosResponse<IAxiosDataResponse>> {
        const response = await axios.get<IAxiosDataResponse>(
            'http://localhost:5000/api/auth/me',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )

        return response
    }
}
