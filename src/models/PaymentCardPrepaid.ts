import mongoose, { Schema } from 'mongoose'
import { defaultSchemaOptions } from '../database';
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
}, defaultSchemaOptions)
export const seeds = []

//export const model = mongoose.model('PaymentCardPrepaid', PaymentCardPrepaidSchema)
