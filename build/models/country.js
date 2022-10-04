"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.model = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const schema = new Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    currencies: [String],
});
exports.schema = schema;
schema.statics.seeds = () => [
    { code: 'ARG', name: 'Argentina', currencies: ['ARS'] },
    { code: 'USA', name: 'Estados Unidos', currencies: ['USD'] },
];
schema.statics.seed = mongoose_1.default.seed;
const model = mongoose_1.default.model('Country', schema);
exports.model = model;
