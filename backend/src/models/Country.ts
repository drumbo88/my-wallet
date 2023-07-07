import { DocumentType, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { myModelOptions } from '../config';
import { BaseModel } from './BaseModel';
import { Currency } from './Currency'

export type DocCountry = DocumentType<Country>;

/*************************************************************************************
 * Clase "Currency" para monedas FIAT y CRIPTO
 */
@modelOptions(myModelOptions)
export class Country extends BaseModel
{
    @prop({ type: String, unique: true, required: true })
    code: string

    @prop({ type: String, required: true })
    name: string

    @prop({ type: () => [Currency], foreignField: 'code', localField: 'currencies', alias: 'currencyCodes', ref: () => Currency })
    currencies: Ref<Currency>[]

    @prop({ type: Number })
    value: number
}

// Genera el modelo a partir de la clase utilizando Typegoose
export const CountryModel = getModelForClass(Country);

export const seeds = [
    { code: 'ARG', name: 'Argentina', currencyCodes: ['ARS'] },
    { code: 'BRA', name: 'Brasil', currencyCodes: ['BRL'] },
    { code: 'USA', name: 'Estados Unidos', currencyCodes: ['USD'] },
]
