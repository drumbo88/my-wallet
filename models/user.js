const mongoose = require('mongoose')
const { Schema } = mongoose;

module.exports = mongoose.model('User', new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    entities: [Schema.types.ObjectId],
    transactionConcepts: [{
        entityId: Schema.types.ObjectId,
        concept: { type: String, unique: true }
    }]
}))