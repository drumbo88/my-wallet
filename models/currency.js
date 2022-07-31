const mongoose = require('mongoose')
const { Schema } = mongoose;

const currencySchema = new Schema({
    _id: { type: String, alias: 'symbol', required: true, unique: true },
    name: { type: String, required: true, unique: true },
    value: { type: Number, required: true },
    api: { type: String },
    type: { type: String, enum: ['FIAT', 'CRYPTO'], default: 'FIAT', required: true },
    countries: [String],
})

const Currency = mongoose.model('Currency', currencySchema)

currencySchema.statics.create = async (data) => {
    try {
        return await this.create(data)
    }
    catch (error) {
        throw new Error(error)
    }
}
currencySchema.static.findAndUpdate = async (filter, data) => {
    try {
        if (typeof(filter)!="Object") 
            filter = { _id: filter }
        return await this.findOneAndUpdate(id, data)
    }
    catch (error) {
        throw new Error(error)
    }
}
module.exports = Currency