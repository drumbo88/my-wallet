const mongoose = require('mongoose')
const { Schema } = mongoose;

module.exports = mongoose.model('Country', new Schema({
    _id: { type: String, alias: 'code', required: true, unique: true },
    name: { type: String, required: true, unique: true },
    currencies: [String],
}))