const mongoose = require('mongoose')
const { Schema } = mongoose;

module.exports = mongoose.model('Transaction', new Schema({
    date: { type: Date, required: true, default: Date.now },
    currency: { type: String, alias: 'currencyCode', required: true },
    amount: { type: Number, required: true, min: 0 },
    concept: { type: Schema.Types.ObjectId, required: true },
    fromAccount: { type: Schema.Types.ObjectId, required: true },
    toAccount: { type: Schema.Types.ObjectId, required: true },
    detail: { type: String, required: true },
}))