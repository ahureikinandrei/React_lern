import { ObjectId } from 'mongodb'
import { Schema, model } from 'mongoose'

const UserModel = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    cities: [{ type: ObjectId, ref: 'City' }],
})

export default model('User', UserModel)
