const mongoose = require('mongoose')
const { Schema } = mongoose;

const { schema: entitySchema } = require('./entity')

module.exports = mongoose.model('Company', new Schema({
    name: { type: String, required: true },
    alias: { type: String },
    taxId: { type: String, unique: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    entity: { type: entitySchema, required: true }
}))