import mongoose, { Schema } from 'mongoose'
import { IPaymentCard } from './PaymentCard';

enum PeriodType {
    DAY = 'DAY',
    MONTH = 'MONTH',
}

export interface IPaymentCardPrepaidData {
}
export interface IPaymentCardPrepaid extends IPaymentCard {
    prepaid: IPaymentCardPrepaidData
}
export const PaymentCardPrepaidSchema = new Schema({
})
export const seeds = []

//export const model = mongoose.model('PaymentCardPrepaid', PaymentCardPrepaidSchema)
