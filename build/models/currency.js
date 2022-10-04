"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.model = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const schema = new Schema({
    symbol: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    value: { type: Number, required: true },
    api: { type: String },
    type: { type: String, enum: ['FIAT', 'CRYPTO'], default: 'FIAT', required: true },
    countries: [String],
});
exports.schema = schema;
schema.statics.seeds = () => [
    { symbol: 'ARS', name: 'Peso Argentino', value: 1 / 130, countries: ['ARG'] },
    { symbol: 'USD', name: 'Dólar Estadounidense', value: 1, countries: ['USA'] },
    { symbol: 'BTC', name: 'Bitcoin', value: 23000, type: 'CRYPTO' },
];
schema.statics.create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield this.create(data);
    }
    catch (error) {
        throw new Error(error);
    }
});
schema.static.findAndUpdate = (filter, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (typeof (filter) != "Object")
            filter = { _id: filter };
        return yield this.findOneAndUpdate(id, data);
    }
    catch (error) {
        throw new Error(error);
    }
});
schema.statics.seed = mongoose_1.default.seed;
const model = mongoose_1.default.model('Currency', schema);
exports.model = model;
