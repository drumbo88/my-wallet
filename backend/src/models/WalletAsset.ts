import { DocumentType, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { myModelOptions } from '../config';
import { BaseModel } from './BaseModel';
import { Currency } from './Currency';

export type DocWalletAsset = DocumentType<WalletAsset>;

/*************************************************************************************
 * Clase "Operation" para operaciones de compra/venta
 */
@modelOptions(myModelOptions)
export class WalletAsset extends BaseModel
{    @prop({ ref: () => Currency, foreignField: 'code', localField: 'currency', alias: "currencyCode", required: true })
    currency: Ref<Currency>

    @prop({ type: Number, default: 0, required: true })
    balance: number

    @prop({ type: String })
    detail: string
}