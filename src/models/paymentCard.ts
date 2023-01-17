import mongoose from 'mongoose'
import { PersonEntityRefSchema } from './PersonEntity';
const { Schema } = mongoose;

enum PaymentCardStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    EXPIRED = 'EXPIRED',
}
enum PaymentCardType {
    DEBIT = 'DEBIT',
    CREDIT = 'CREDIT',
    PREPAID = 'PREPAID',
}

export const PaymentCardFields = {
    name: { type: String },
    number: { type: Number },
    expDate: { type: String },

    userEntity: { type: PersonEntityRefSchema, required: true }, //
    serviceEntity: { type: PersonEntityRefSchema }, // (opt.) Visa / Mastercard
    adminEntity: { type: PersonEntityRefSchema, required: true }, // DC=Company | CC=Company/null | PPC=Sube/Previaje=>MinTransporte / GiftVoucher=>Company

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
    type: { type: String, enum: PaymentCardType, required: true },
}

