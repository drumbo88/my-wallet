import mongoose, { Schema } from 'mongoose'
import { defaultSchemaOptions } from '../database';
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
export const PaymentCardDebitSchema = new Schema({}, defaultSchemaOptions)
export const seeds = []

//export const model = mongoose.model('PaymentCardDebit', PaymentCardDebitSchema)
