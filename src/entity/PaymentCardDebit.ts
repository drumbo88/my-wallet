import mongoose, { Schema } from 'mongoose'
import { PaymentCardFields } from './PaymentCard';

export const PaymentCardDebitFields = {
}

export const PaymentCardDebitSchema = new Schema({
  ...PaymentCardFields,
  card: { type: PaymentCardDebitFields, required: true }
})

export const model = mongoose.model('PaymentCardDebit', PaymentCardDebitSchema)
