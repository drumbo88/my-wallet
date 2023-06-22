import { DocumentType, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import mongoose from 'mongoose'
import { myModelOptions } from '../config';
import { defaultSchemaOptions } from '../database';
import { BaseModel } from './BaseModel';
import { Currency } from './Currency'
const { Schema } = mongoose;

export type DocCountry = DocumentType<Country>;

/*************************************************************************************
 * Clase "Currency" para monedas FIAT y CRIPTO
 */
@modelOptions(myModelOptions)
export class Country extends BaseModel {
    @prop({ type: String, unique: true, required: true })
    code: string

    @prop({ type: String, required: true })
    name: string

    @prop({ type: () => [Currency], ref: Currency })
    currencyCodes: Ref<Currency>[]
}

// Genera el modelo a partir de la clase utilizando Typegoose
export const CountryModel = getModelForClass(Country);

export const seeds = [
    { code: 'ARG', name: 'Argentina', currencyCodes: ['ARS'] },
    { code: 'BRA', name: 'Brasil', currencyCodes: ['BRL'] },
    { code: 'USA', name: 'Estados Unidos', currencyCodes: ['USD'] },
]
