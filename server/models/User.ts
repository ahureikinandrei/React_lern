const { Schema, model, ObjectId } = require('mongoose')

const UserModel = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    cities: [{ type: ObjectId, ref: 'City' }],
})

module.exports = model('User', UserModel)
