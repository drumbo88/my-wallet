import mongoose, { Schema } from 'mongoose'
import { PaymentCardFields } from './PaymentCard';

export const PaymentCardPrepaidFields = {
}

export const PaymentCardPrepaidSchema = new Schema({
  ...PaymentCardFields,
  card: { type: PaymentCardPrepaidFields, required: true }
})

export const model = mongoose.model('PaymentCardPrepaid', PaymentCardPrepaidSchema)
