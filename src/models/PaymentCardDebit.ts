import mongoose, { Schema } from 'mongoose'
import { IPaymentCard } from './PaymentCard';

enum PeriodType {
    DAY = 'DAY',
    MONTH = 'MONTH',
}

export interface IPaymentCardDebitData {
  period: {
    type: {
        quantity: { type: Number, required: true },
        type: { type: String, enum: PeriodType, required: true },
    }
  },
}
export interface IPaymentCardDebit extends IPaymentCard {
  debit: IPaymentCardDebitData
}
export const PaymentCardDebitSchema = new Schema({})
export const seeds = []

//export const model = mongoose.model('PaymentCardDebit', PaymentCardDebitSchema)
