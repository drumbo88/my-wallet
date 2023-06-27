import { DocumentType, getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { myModelOptions } from "../config";
import { CurrencyType } from "common/types/currency";
import { BaseModel } from "./BaseModel";

export type DocCurrency = DocumentType<Currency>;

/*************************************************************************************
 * Clase "Currency" para monedas FIAT y CRIPTO
 */
@modelOptions(myModelOptions)
export class Currency extends BaseModel {
    @prop({ type: String, unique: true, required: true })
    code: string

    @prop({ type: String, unique: true, required: true })
    symbol: string

    @prop({ type: String, required: true })
    name: string

    @prop({ type: Number })
    value: number

    @prop({ type: String })
    api?: string

    @prop({ type: CurrencyType, default: CurrencyType.FIAT })
    type: CurrencyType

    // Método abstracto para obtener el tipo de currency
    getTipo(): string {
        throw new Error('El método getTipo() debe ser implementado por las clases hijas');
    }
}

export const seeds = [
    { symbol: '$', code: 'ARS', name: 'Peso Argentino', value: 1/130 },
    { symbol: '$', code: 'USD', name: 'Dólar Estadounidense', value: 1 },
    { symbol: '$', code: 'BRL', name: 'Real Brasileño', value: 1/35.5 },
    { symbol: '₿', code: 'BTC', name: 'Bitcoin', value: 19000, type: CurrencyType.CRYPTO },
]

// Genera el modelo a partir de la clase utilizando Typegoose
export const CurrencyModel = getModelForClass(Currency);
