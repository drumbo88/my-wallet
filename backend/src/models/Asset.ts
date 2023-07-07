import { DocumentType, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { myModelOptions } from '../config';
import { BaseModel } from './BaseModel';

export type DocAsset = DocumentType<Asset>;

/*************************************************************************************
 * Clase "Asset" para monedas FIAT y CRIPTO
 */
@modelOptions(myModelOptions)
export class Asset extends BaseModel
{
    @prop({ type: String, unique: true, required: true })
    code: string

    @prop({ type: String, unique: true, required: true })
    symbol: string

    @prop({ type: Number, required: true, default: 0 })
    balance: number
}

// Genera el modelo a partir de la clase utilizando Typegoose
export const AssetModel = getModelForClass(Asset);
