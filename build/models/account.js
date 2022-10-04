"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.model = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const schema = new Schema({
    address: { type: String },
    alias: { type: String },
    status: { type: String, enum: ['ACTIVE', 'INCATIVE'], default: 'ACTIVE' },
    adminEntity: { type: Schema.Types.ObjectId, ref: 'Entity', required: true },
    userEntity: { type: Schema.Types.ObjectId, ref: 'Entity', required: true },
    currency: { type: String, alias: 'currencyCode', default: 'ARS' },
    type: { type: String, enum: ['funds', 'spot', 'earn', 'fixedTerm', 'credit'], default: 'funds' },
    balance: { type: Number, required: true },
    debitCards: [{ type: Schema.Types.ObjectId, ref: 'PaymentCard' }],
    prepaidCards: [{ type: Schema.Types.ObjectId, ref: 'PaymentCard' }],
    creditCards: [{ type: Schema.Types.ObjectId, ref: 'PaymentCard' }],
    detail: { type: String },
});
exports.schema = schema;
/* ToDo: Cada Account tendrá 1 asset (bancos) o más de un Asset (criptoBank)
    - funds: { currency, amount, ... }
    - fixedTerm: { currency, amount, ... }

    - funds: [{ currency, amount, ... }, ...]
    - spot: [{ currency, amount, ... }, ...]
    - earn: [{ currency, amount, ... }, ...]
*/
schema.statics.seed = mongoose_1.default.seed;
const model = mongoose_1.default.model('Account', schema);
exports.model = model;
