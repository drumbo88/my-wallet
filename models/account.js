const mongoose = require('mongoose')
const { Schema } = mongoose;

const schema = new Schema({
    address: { type: String, required: true },
    alias: { type: String, required: false },
    status: { type: String, enum: ['ACTIVE', 'INCATIVE'], required: true },
    entityId: { type: Schema.Types.ObjectId, required: true },
    currency: { type: String, alias: 'currencyCode' },
    detail: { type: String },
})

module.exports = mongoose.model('Account', schema)