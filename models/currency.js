import mongoose from 'mongoose'
const { Schema } = mongoose;

const schema = new Schema({
    symbol: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    value: { type: Number, required: true },
    api: { type: String },
    type: { type: String, enum: ['FIAT', 'CRYPTO'], default: 'FIAT', required: true },
    countries: [String],
})

schema.statics.seeds = () => [
    { symbol: 'ARS', name: 'Peso Argentino', value: 1/130, countries: ['ARG'] },
    { symbol: 'USD', name: 'Dólar Estadounidense', value: 1, countries: ['USA'] },
    { symbol: 'BTC', name: 'Bitcoin', value: 23000, type: 'CRYPTO' },
]

schema.statics.create = async (data) => {
    try {
        return await this.create(data)
    }
    catch (error) {
        throw new Error(error)
    }
}
schema.static.findAndUpdate = async (filter, data) => {
    try {
        if (typeof(filter)!="Object")
            filter = { _id: filter }
        return await this.findOneAndUpdate(id, data)
    }
    catch (error) {
        throw new Error(error)
    }
}
schema.statics.seed = mongoose.seed

const model = mongoose.model('Currency', schema)

export { model, schema }
