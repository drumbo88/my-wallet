import mongoose, { Schema } from 'mongoose'
import { IWalletAsset, schema as WalletAsset } from './WalletAsset'

enum WalletStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}
enum WalletType {
    FUNDS = 'FUNDS',
    SPOT = 'SPOT',
    EARN = 'EARN',
    FIXED_TERM = 'FIXED_TERM',
    CREDIT = 'CREDIT',
}
export interface IWallet {
    address?: String,
    alias?: String,
    status?: WalletStatus,
    type?: WalletType,

    currency: String,
    balance?: Number,
    assets?: IWalletAsset[],

    detail: String,
}

const schema = new Schema<IWallet>({
    address: { type: String },
    alias: { type: String },
    status: { type: String, enum: WalletStatus, default: WalletStatus.ACTIVE },
    type: { type: String, enum: WalletType, default: WalletType.FUNDS },
    // currency: { type: String, alias: 'currencyCode', default: 'ARS' },

    balance: { type: Number, default: 0 },
    assets: [ WalletAsset ],

    // debitCards: [ PaymentCardRef ], // [{ type: Schema.Types.ObjectId, ref: 'PaymentCard' }],
    // prepaidCards: [ PaymentCardRef ], // [{ type: Schema.Types.ObjectId, ref: 'PaymentCard' }],
    // creditCards: [ PaymentCardRef ], // [{ type: Schema.Types.ObjectId, ref: 'PaymentCard' }],

    detail: { type: String },
})
/* ToDo: Cada Wallet tendrá 1 asset (bancos) o más de un Asset (criptoBank)
    - funds: { currency, amount, ... }
    - fixedTerm: { currency, amount, ... }

    - funds: [{ currency, amount, ... }, ...]
    - spot: [{ currency, amount, ... }, ...]
    - earn: [{ currency, amount, ... }, ...]


    const productosSchema = new mongoose.Schema(
        {
            name: String,
            price: {
                type: Number,
                get: v => (v/100).toFixed(2),
                set: v => v*100
            }
        },
        {
            toJS0N: { getters: true } //this right here
        }
    );
*/

//const model = mongoose.model('Wallet', schema)
//export { model, schema }
export { schema }