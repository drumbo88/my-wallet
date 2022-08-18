const mongoose = require('mongoose')
const { Schema } = mongoose;

const { schema: entitySchema } = require('./entity')

module.exports = mongoose.model('Person', new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthdate: { type: Date },
    taxId: { type: String },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    entity: { type: entitySchema, required: true }
}))