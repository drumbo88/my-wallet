const mongoose = require('mongoose')
const { Schema } = mongoose;

const { schema: accountSchema } = require('./account')

module.exports = mongoose.model('Entity', new Schema({
    type: { type: String, enum: ['Person', 'Wallet', 'Bank', 'CryptoWallet', 'DigitalWallet'], required: true },
    status: { type: String, enum: ['ACTIVE', 'INCATIVE'], required: true },
    _entityId: { type: Schema.Types.ObjectId, required: true },
    _defaultCurrencyId: { type: Schema.Types.ObjectId, required: false },
    accounts: [accountSchema],
}))