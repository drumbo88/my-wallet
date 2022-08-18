const mongoose = require('mongoose')
const { Schema } = mongoose;

const schema = new Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    currencies: [String],
})

schema.statics.seeds = () => [
    { code: 'ARG', name: 'Argentina', countries: ['ARS'] },
    { code: 'USA', name: 'Estados Unidos', countries: ['USD'] },
]
schema.statics.seed = mongoose.seed

module.exports = mongoose.model('Country', schema)
