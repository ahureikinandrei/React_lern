import { IUserSchema } from '../models/User'
import { IUserDataResponse } from '../types'

export const transformUserFromDataBase = (
    user: IUserSchema
): IUserDataResponse => {
    const { email, cities } = user
    return {
        user: {
            email,
            cities,
        },
    }
}

export const transformUsersFromDataBase = (
    users: IUserSchema[]
): IUserDataResponse[] => {
    return users.map(({ email, cities }) => {
        return {
            user: {
                email,
                cities,
            },
        }
    })
}
