import { IUser } from '../models/IUser'

interface IDataResponse {
    token?: string
    user?: IUser
}

export interface IAxiosDataResponse {
    data: IDataResponse | null
    message: string
    error?: string
}
