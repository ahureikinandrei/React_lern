import { Schema, model } from 'mongoose'

const UserModel = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cities: [{ type: Schema.Types.ObjectId, ref: 'City' }],
})

export default model('User', UserModel)
