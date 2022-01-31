export interface IUser {
    email: string
    password?: string
}

export interface IUserDataResponse {
    user: {
        email: string
        cities: string[]
    }
    token?: string
}

export type CustomData = IUserDataResponse | null
