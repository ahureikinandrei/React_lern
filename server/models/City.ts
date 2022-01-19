import { Schema, model } from 'mongoose'

const CityModel = new Schema({
    name: { type: String, required: true },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    country: { type: String, required: true },
})

export default model('City', CityModel)
