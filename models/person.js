const mongoose = require('mongoose')
const { Schema } = mongoose;

const { schema: entitySchema } = require('./entity')

module.exports = mongoose.model('Person', new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    birthdate: { type: Date },
    taxId: { type: String, unique: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    entity: { type: entitySchema, required: true }
}))