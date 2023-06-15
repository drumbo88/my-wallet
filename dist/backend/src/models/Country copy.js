"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Country = exports.seeds = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../database");
const { Schema } = mongoose_1.default;
const schema = new Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    currencyCodes: [{ type: String }],
}, database_1.defaultSchemaOptions);
schema.virtual("currencies", {
    ref: "Currency",
    localField: "currencyCodes",
    foreignField: "code",
    justOne: false,
    strictPopulate: false,
});
exports.seeds = [
    { code: 'ARG', name: 'Argentina', currencyCodes: ['ARS'] },
    { code: 'BRA', name: 'Brasil', currencyCodes: ['BRL'] },
    { code: 'USA', name: 'Estados Unidos', currencyCodes: ['USD'] },
];
// schema.statics.seed = async function (seeds) {
//     await this.insertMany(seeds)
//     // const x = await this.findOne().populate('currencies');
//     // console.log(x)
// }
const Country = mongoose_1.default.model('Country', schema);
exports.Country = Country;
