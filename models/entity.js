const mongoose = require('mongoose')
const { Schema } = mongoose;

const { schema: personSchema } = require('./person')
const { schema: companySchema } = require('./company')
const { schema: accountSchema } = require('./account')

const schema = new Schema({
    type: { type: String, enum: ['Person', 'Wallet', 'Bank', 'CryptoWallet', 'DigitalWallet'], required: true },
    status: { type: String, enum: ['ACTIVE', 'INCATIVE'], required: true },
    entityId: { type: Schema.Types.ObjectId },
    currency: { type: String },
    accounts: [accountSchema],
    child: { type: Schema.Types.Mixed, enum: [personSchema, companySchema], required: true },
})

schema.statics.seeds = () => [
    { type: 'Person', status: 'ACTIVE', accounts: [{
        address: '9287394128571952934521',
        status: 'ACTIVE',
    }], child: { 
        firstName: 'Darío',
        lastName: 'Rumbo',
        birthdate: '1988-06-19',
        taxId: '20337466711',
        gender: 'male',
    } },
]
schema.statics.seed = mongoose.seed

schema.statics.create = async (data) => {
    try {
        return await this.create(data)
    }
    catch (error) {
        throw new Error(error)
    }
}

module.exports = mongoose.model('Entity', schema)