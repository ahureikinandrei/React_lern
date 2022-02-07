import { model, Schema, Document, Types } from 'mongoose'

export interface IUserSchema {
    _id?: string
    email: string
    password: string
    cities: Types.Array<string>
}

export type UserSchemaDocument = IUserSchema & Document

const UserModel = new Schema<IUserSchema>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cities: [{ type: Schema.Types.ObjectId, ref: 'City' }],
})

export default model<UserSchemaDocument>('User', UserModel)
