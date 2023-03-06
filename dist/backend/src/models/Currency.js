"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seeds = exports.Currency = exports.schema = exports.CurrencyType = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../database");
const { Schema } = mongoose_1.default;
var CurrencyType;
(function (CurrencyType) {
    CurrencyType["FIAT"] = "FIAT";
    CurrencyType["CRYPTO"] = "CRYPTO";
})(CurrencyType = exports.CurrencyType || (exports.CurrencyType = {}));
const schema = new Schema({
    code: { type: String, required: true, unique: true },
    symbol: { type: String, default: '$' },
    name: { type: String, required: true, unique: true },
    value: { type: Number, required: true },
    api: { type: String },
    type: { type: String, enum: CurrencyType, default: CurrencyType.FIAT, required: true },
    //countries: [{ type: String, ref: 'Country', foreignField: 'code' }],
}, database_1.defaultSchemaOptions);
exports.schema = schema;
const seeds = [
    { symbol: '$', code: 'ARS', name: 'Peso Argentino', value: 1 / 130 },
    { symbol: '$', code: 'USD', name: 'Dólar Estadounidense', value: 1 },
    { symbol: '$', code: 'BRL', name: 'Real Brasileño', value: 1 / 35.5 },
    { symbol: '$', code: 'BTC', name: 'Bitcoin', value: 19000, type: CurrencyType.CRYPTO },
];
exports.seeds = seeds;
// schema.statics.seed = function (seeds) {
// }
const Currency = mongoose_1.default.model('Currency', schema);
exports.Currency = Currency;
