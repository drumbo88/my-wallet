import mongoose, { Schema } from 'mongoose'

export interface IWalletAsset {
    currency: String,
    balance: number,
    detail?: String
}
const schema = new Schema<IWalletAsset>({
    currency: { type: String, alias: 'currencyCode', default: 'ARS' },
    balance: { type: Number, required: true },

    detail: { type: String },
})

//export { model, schema }
export { schema }