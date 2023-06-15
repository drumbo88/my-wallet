"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seeds = exports.PaymentCardCreditSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const database_1 = require("../database");
var PeriodType;
(function (PeriodType) {
    PeriodType["DAY"] = "DAY";
    PeriodType["MONTH"] = "MONTH";
})(PeriodType || (PeriodType = {}));
exports.PaymentCardCreditSchema = new mongoose_1.Schema({
    period: new mongoose_1.default.Schema({
        quantity: { type: Number, required: true },
        type: { type: String, enum: PeriodType, required: true },
    }),
}, database_1.defaultSchemaOptions);
exports.seeds = [
    {
        name: 'DARIO A RUMBO',
        number: '43383100XXXX3840',
        expDate: '0628',
        ownerAccount: { ownerEntity: { taxId: '20337466711' }, adminEntity: { taxId: '30500003193' } },
        //serviceEntity: { type: Schema.Types.ObjectId, ref: 'Entity' }, // (opt.) Visa / Mastercard
        //adminEntity: { taxId: '' }, // DC=Company | CC=Company/null | PPC=Sube/Previaje=>MinTransporte / GiftVoucher=>Company
        balance: 0,
    }
];
//export const model = mongoose.model('PaymentCardCredit', PaymentCardCreditSchema)
