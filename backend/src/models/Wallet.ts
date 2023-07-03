import { DocumentType, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { WalletStatus, WalletType } from 'common/types/wallet'
import { myModelOptions } from '../config';
import { BaseModel } from './BaseModel';
import { WalletAsset } from './WalletAsset';

export type DocWallet = DocumentType<Wallet>;

/*************************************************************************************
 * Clase "Wallet" para monedas FIAT y CRIPTO
 */
@modelOptions(myModelOptions)
export class Wallet extends BaseModel {
    @prop({ type: String, unique: true, required: true })
    address: string

    @prop({ type: String, unique: true, required: true })
    alias: string

    @prop({ type: WalletStatus, required: true })
    status: string

    @prop({ type: WalletType })
    type: string

    @prop({ type: Wallet, ref: () => Wallet })
    wallet?: Ref<Wallet>

    @prop({ type: Number, default: 0 })
    balance: number

    @prop({ type: () => [WalletAsset] })
    assets: WalletAsset[]

    @prop({ type: String })
    detail: string
}

/*export const seeds = [
    { symbol: '$', code: 'ARS', name: 'Peso Argentino', value: 1/130 },
    { symbol: '$', code: 'USD', name: 'Dólar Estadounidense', value: 1 },
    { symbol: '$', code: 'BRL', name: 'Real Brasileño', value: 1/35.5 },
    { symbol: '₿', code: 'BTC', name: 'Bitcoin', value: 19000, type: WalletType.CRYPTO },
]
*/
// Genera el modelo a partir de la clase utilizando Typegoose
export const WalletModel = getModelForClass(Wallet);

/*const schema = new Schema<IWallet>({
    address: { type: String },
    alias: { type: String },
    status: { type: String, enum: WalletStatus, default: WalletStatus.ACTIVE },
    type: { type: String, enum: WalletType, default: WalletType.FUNDS },
    // wallet: { type: String, alias: 'walletCode', default: 'ARS' },

    balance: { type: Number, default: 0 },
    assets: [ WalletAsset ],

    // debitCards: [ PaymentCardRef ], // [{ type: Schema.Types.ObjectId, ref: () => 'PaymentCard' }],
    // prepaidCards: [ PaymentCardRef ], // [{ type: Schema.Types.ObjectId, ref: () => 'PaymentCard' }],
    // creditCards: [ PaymentCardRef ], // [{ type: Schema.Types.ObjectId, ref: () => 'PaymentCard' }],

    detail: { type: String },
}, defaultSchemaOptions)
/* ToDo: Cada Wallet tendrá 1 asset (bancos) o más de un Asset (criptoBank)
    - funds: { wallet, amount, ... }
    - fixedTerm: { wallet, amount, ... }

    - funds: [{ wallet, amount, ... }, ...]
    - spot: [{ wallet, amount, ... }, ...]
    - earn: [{ wallet, amount, ... }, ...]


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
