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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = exports.AccountSchema = exports.AccountTypes = exports.AccountStatus = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const database_1 = require("../database");
const Entity_1 = require("./Entity");
const PaymentCard_1 = require("./PaymentCard");
const Wallet_1 = require("./Wallet");
// import { EntityRefSchema } from './Entity'
var AccountStatus;
(function (AccountStatus) {
    AccountStatus["ACTIVE"] = "ACTIVE";
    AccountStatus["INACTIVE"] = "INACTIVE";
})(AccountStatus = exports.AccountStatus || (exports.AccountStatus = {}));
var AccountTypes;
(function (AccountTypes) {
    AccountTypes["FUNDS"] = "FUNDS";
    AccountTypes["SPOT"] = "SPOT";
    AccountTypes["EARN"] = "EARN";
    AccountTypes["FIXED_TERM"] = "FIXED_TERM";
    AccountTypes["CREDIT"] = "CREDIT";
})(AccountTypes = exports.AccountTypes || (exports.AccountTypes = {}));
const AccountSchema = new mongoose_1.Schema({
    status: { type: String, enum: AccountStatus, default: AccountStatus.ACTIVE },
    type: { type: String, enum: AccountTypes, default: AccountTypes.FUNDS },
    adminEntityId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Entity', required: true },
    ownerEntityId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Entity', required: true },
    wallets: [Wallet_1.schema],
    paymentCards: [PaymentCard_1.PaymentCardSchema]
}, database_1.defaultSchemaOptions);
exports.AccountSchema = AccountSchema;
AccountSchema.virtual('ownerEntity', {
    ref: 'Entity', localField: 'ownerEntityId', foreignField: '_id', justOne: true,
});
AccountSchema.virtual('adminEntity', {
    ref: 'Entity', localField: 'adminEntityId', foreignField: '_id', justOne: true,
});
AccountSchema.statics.getByOwner = function (entityData) {
    return __awaiter(this, void 0, void 0, function* () {
        const ownerEntity = (entityData instanceof Entity_1.EntityModel)
            ? entityData : yield Entity_1.EntityModel.findOne(entityData);
        if (!ownerEntity) {
            throw new Error(`Entity doesn't exist (${JSON.stringify(entityData)}).`);
        }
        // return Account.find({ ownerEntityId: ownerEntity._id })
    });
};
// class x {}
// schema.loadClass(class extends x {})
/* ToDo: Cada Account tendrá varias wallet (bancos) o más de un Asset (criptoBank)
    - funds: { currency, amount, ... }
    - fixedTerm: { currency, amount, ... }

    - funds: [{ currency, amount, ... }, ...]
    - spot: [{ currency, amount, ... }, ...]
    - earn: [{ currency, amount, ... }, ...]
*/
const Account = mongoose_1.default.model('Account', AccountSchema);
exports.Account = Account;
