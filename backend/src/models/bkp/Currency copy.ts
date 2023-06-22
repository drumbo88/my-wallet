import mongoose from 'mongoose'
import { defaultSchemaOptions } from '../database';
const { Schema } = mongoose;

export enum CurrencyType {
    FIAT = 'FIAT',
    CRYPTO = 'CRYPTO',
}

export interface ICurrency {
    code: String,
    symbol: String,
    name: String,
    value: number,
    api?: String,
    type: CurrencyType,
}

const schema = new Schema<ICurrency>({
    code: { type: String, required: true, unique: true },
    symbol: { type: String, default: '$' },
    name: { type: String, required: true, unique: true },
    value: { type: Number, required: true },
    api: { type: String },
    type: { type: String, enum: CurrencyType, default: CurrencyType.FIAT, required: true },
    //countries: [{ type: String, ref: 'Country', foreignField: 'code' }],
}, defaultSchemaOptions)

const seeds = [
    { symbol: '$', code: 'ARS', name: 'Peso Argentino', value: 1/130 },
    { symbol: '$', code: 'USD', name: 'Dólar Estadounidense', value: 1 },
    { symbol: '$', code: 'BRL', name: 'Real Brasileño', value: 1/35.5 },
    { symbol: '$', code: 'BTC', name: 'Bitcoin', value: 19000, type: CurrencyType.CRYPTO },
]
// schema.statics.seed = function (seeds) {
// }

const Currency = mongoose.model<ICurrency>('Currency', schema)

export { schema, Currency, seeds }
