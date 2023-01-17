import mongoose from 'mongoose'
import { Currency, ICurrency } from './Currency'
const { Schema } = mongoose;

export interface ICountry {
    code: String,
    name: String,
    currenciesCodes: String[],
    currencies: ICurrency[],
}

const schema = new Schema<ICountry>({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    currenciesCodes: [{ type: String }],
})
schema.virtual("currencies", {
    ref: "Currency",
    localField: "currenciesCodes",
    foreignField: "code",
    justOne: false,
    strictPopulate: false,
});
schema.set("toObject", { virtuals: true });
schema.set("toJSON", { virtuals: true });

export const seeds = [
    { code: 'ARG', name: 'Argentina', currenciesCodes: ['ARS'] },
    { code: 'BRA', name: 'Brasil', currenciesCodes: ['BRL'] },
    { code: 'USA', name: 'Estados Unidos', currenciesCodes: ['USD'] },
]

// schema.statics.seed = async function (seeds) {
//     await this.insertMany(seeds)
//     // const x = await this.findOne().populate('currencies');
//     // console.log(x)
// }
const Country = mongoose.model<ICountry>('Country', schema)
export { Country }
