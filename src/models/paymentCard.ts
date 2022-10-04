import mongoose from 'mongoose'
const { Schema } = mongoose;

const schema = new Schema({
    name: { type: String },
    number: { type: Number },
    expDate: { type: String },
    userEntity: { type: Schema.Types.ObjectId, ref: 'Entity', required: true }, //
    serviceEntity: { type: Schema.Types.ObjectId, ref: 'Entity' }, // (opt.) Visa / Mastercard
    adminEntity: { type: Schema.Types.ObjectId, ref: 'Entity', required: true }, // DC=Company | CC=Company/null | PPC=Sube/Previaje=>MinTransporte / GiftVoucher=>Company
    balance: { type: Number, required: true },

    limits: {
        payment: {
            day: { type: Number, min: 0 },
            week: { type: Number, min: 0 },
            month: { type: Number, min: 0 },
            all: { type: Number, min: 0 },
        },
        extraction: {
            day: { type: Number, min: 0 },
            week: { type: Number, min: 0 },
            month: { type: Number, min: 0 },
            all: { type: Number, min: 0 },
        },
    },
    // excluyent types: ['PREPAID', 'DEBIT', 'CREDIT'],
    debit: {

    },
    prepaid: {
        fundable: { type: Boolean, required: true }, // can add funds
    },
    credit: {
        period: { type: String, default: '1 month' },
    },
})

schema.statics.seed = mongoose.seed

const model = mongoose.model('PrepaidCard', schema)

export { model, schema }

