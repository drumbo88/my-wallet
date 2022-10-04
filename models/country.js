import mongoose from 'mongoose'
const { Schema } = mongoose;

const schema = new Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    currencies: [String],
})

schema.statics.seeds = () => [
    { code: 'ARG', name: 'Argentina', currencies: ['ARS'] },
    { code: 'USA', name: 'Estados Unidos', currencies: ['USD'] },
]

schema.statics.seed = mongoose.seed

const model = mongoose.model('Country', schema)

export { model, schema }
