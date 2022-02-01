import { Schema, model, Document } from 'mongoose'

export interface ICitySchema {
    _id?: string
    name: string
    lat: number
    lon: number
    country: string
}

export type CitySchemaDocument = ICitySchema & Document

const CityModel = new Schema<ICitySchema>({
    name: { type: String, required: true, unique: true },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    country: { type: String, required: true },
})

export default model<CitySchemaDocument>('City', CityModel)
