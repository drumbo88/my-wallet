import mongoose from 'mongoose'
const { Schema } = mongoose;

const schema = new Schema({
    address: { type: String },
    alias: { type: String },
    status: { type: String, enum: ['ACTIVE', 'INCATIVE'], default: 'ACTIVE' },
    adminEntity: { type: Schema.Types.ObjectId, ref: 'Entity', required: true },
    userEntity: { type: Schema.Types.ObjectId, ref: 'Entity', required: true },
    currency: { type: String, alias: 'currencyCode', default: 'ARS' },
    type: { type: String, enum: ['funds', 'spot', 'earn', 'fixedTerm', 'credit'], default: 'funds' },
    balance: { type: Number, required: true },

    debitCards: [{ type: Schema.Types.ObjectId, ref: 'PaymentCard' }],
    prepaidCards: [{ type: Schema.Types.ObjectId, ref: 'PaymentCard' }],
    creditCards: [{ type: Schema.Types.ObjectId, ref: 'PaymentCard' }],

    detail: { type: String },
})
/* ToDo: Cada Account tendrá 1 asset (bancos) o más de un Asset (criptoBank)
    - funds: { currency, amount, ... }
    - fixedTerm: { currency, amount, ... }

    - funds: [{ currency, amount, ... }, ...]
    - spot: [{ currency, amount, ... }, ...]
    - earn: [{ currency, amount, ... }, ...]
*/

schema.statics.seed = mongoose.seed

const model = mongoose.model('Account', schema)

export { model, schema }