import mongoose from 'mongoose'
import { defaultSchemaOptions } from '../database';
import { Currency, ICurrency } from './Currency'
const { Schema } = mongoose;

export interface ICountry {
    code: String,
    name: String,
    currencyCodes: String[],
    currencies: ICurrency[],
}

const schema = new Schema<ICountry>({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    currencyCodes: [{ type: String }],
}, defaultSchemaOptions)

schema.virtual("currencies", {
    ref: "Currency",
    localField: "currencyCodes",
    foreignField: "code",
    justOne: false,
    strictPopulate: false,
});

export const seeds = [
    { code: 'ARG', name: 'Argentina', currencyCodes: ['ARS'] },
    { code: 'BRA', name: 'Brasil', currencyCodes: ['BRL'] },
    { code: 'USA', name: 'Estados Unidos', currencyCodes: ['USD'] },
]

// schema.statics.seed = async function (seeds) {
//     await this.insertMany(seeds)
//     // const x = await this.findOne().populate('currencies');
//     // console.log(x)
// }
const Country = mongoose.model<ICountry>('Country', schema)
export { Country }
