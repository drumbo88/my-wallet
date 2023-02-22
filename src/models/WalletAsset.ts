import mongoose, { Schema } from 'mongoose'
import { defaultSchemaOptions } from '../database'

export interface IWalletAsset {
    currency: String,
    balance: number,
    detail?: String
}
const schema = new Schema<IWalletAsset>({
    currency: { type: String, alias: 'currencyCode', default: 'ARS' },
    balance: { type: Number, required: true },

    detail: { type: String },
}, defaultSchemaOptions)

//export { model, schema }
export { schema }