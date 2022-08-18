const mongoose = require('mongoose')
const { Schema } = mongoose;

const schema = new Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['INCOME', 'EXPENSE'], required: true },
    userId: { type: Schema.Types.ObjectId },
})
schema.statics.seeds = () => [
    { name: 'Sueldo', type: 'INCOME' },
]
schema.statics.seed = mongoose.seed

module.exports = mongoose.model('TransactionConcept', schema)