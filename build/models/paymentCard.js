"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.model = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const schema = new Schema({
    name: { type: String },
    number: { type: Number },
    expDate: { type: String },
    userEntity: { type: Schema.Types.ObjectId, ref: 'Entity', required: true },
    serviceEntity: { type: Schema.Types.ObjectId, ref: 'Entity' },
    adminEntity: { type: Schema.Types.ObjectId, ref: 'Entity', required: true },
    balance: { type: Number, required: true },
    limits: {
        payment: {
            day: { type: Number, min: 0 },
            week: { type: Number, min: 0 },
            month: { type: Number, min: 0 },
            all: { type: Number, min: 0 },
        },
        extraction: {
            day: { type: Number, min: 0 },
            week: { type: Number, min: 0 },
            month: { type: Number, min: 0 },
            all: { type: Number, min: 0 },
        },
    },
    // excluyent types: ['PREPAID', 'DEBIT', 'CREDIT'],
    debit: {},
    prepaid: {
        fundable: { type: Boolean, required: true }, // can add funds
    },
    credit: {
        period: { type: String, default: '1 month' },
    },
});
exports.schema = schema;
schema.statics.seed = mongoose_1.default.seed;
const model = mongoose_1.default.model('PrepaidCard', schema);
exports.model = model;
