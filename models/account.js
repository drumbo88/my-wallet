const mongoose = require('mongoose')
const { Schema } = mongoose;

module.exports = mongoose.model('Account', new Schema({
    address: { type: String, required: true },
    alias: { type: String, required: false },
    status: { type: String, enum: ['ACTIVE', 'INCATIVE'], required: true },
    _entityId: { type: Schema.Types.ObjectId, required: true },
    _defaultCurrencyId: { type: Schema.Types.ObjectId, required: false },
    detail: { type: String, required: true },
}))