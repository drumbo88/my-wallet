import mongoose, { Schema } from 'mongoose'
import { PaymentCardFields } from './PaymentCard';

enum PeriodType {
    DAY = 'DAY',
    MONTH = 'MONTH',
}

export const PaymentCardCreditFields = {
  period: {
    type: {
        quantity: { type: Number, required: true },
        type: { type: String, enum: PeriodType, required: true },
    }
  },
}

export const PaymentCardCreditSchema = new Schema({
  ...PaymentCardFields,
  card: { type: PaymentCardCreditFields, required: true }
})
export const model = mongoose.model('PaymentCardCredit', PaymentCardCreditSchema)
