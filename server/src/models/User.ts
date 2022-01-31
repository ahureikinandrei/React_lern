import { model, Schema, Document } from 'mongoose'

export interface IUserSchema {
    _id?: string
    email: string
    password: string
    cities?: string[]
}

export type UserSchemaDocument = IUserSchema & Document

const UserModel = new Schema<IUserSchema>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cities: [{ type: Schema.Types.ObjectId, ref: 'City' }],
})

export default model<UserSchemaDocument>('User', UserModel)
