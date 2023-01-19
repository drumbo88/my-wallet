import mongoose from 'mongoose'
const { Schema } = mongoose;

enum PaymentCardStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    EXPIRED = 'EXPIRED',
}
enum PaymentCardTypes {
    DEBIT = 'DEBIT',
    CREDIT = 'CREDIT',
    PREPAID = 'PREPAID',
}

export const PaymentCardFields = {
    name: { type: String },
    number: { type: Number },
    expDate: { type: String },

    userEntity: { type: Schema.Types.ObjectId, ref: 'Entity', required: true }, //
    serviceEntity: { type: Schema.Types.ObjectId, ref: 'Entity' }, // (opt.) Visa / Mastercard
    adminEntity: { type: Schema.Types.ObjectId, ref: 'Entity', required: true }, // DC=Company | CC=Company/null | PPC=Sube/Previaje=>MinTransporte / GiftVoucher=>Company

    balance: { type: Number, required: true },
    status: { type: String, enum: PaymentCardStatus, required: true },

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
}

export const PaymentCardRef = {
    paymentCard: { type: Schema.Types.ObjectId, refPath: 'type', required: true },
    type: { type: String, enum: PaymentCardTypes, required: true },
}

