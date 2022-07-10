const mongoose = require('mongoose')
const { Schema } = mongoose;

module.exports = mongoose.model('Income', new Schema({
    symbol: { type: String, required: true },
    name: { type: String, required: true },
    value: { type: Number, required: true },
    api: { type: String, required: true },
    type: { type: String, enum: ['FIAT', 'CRYPTO'], default: 'FIAT', required: true },
}))