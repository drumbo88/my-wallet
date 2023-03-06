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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentCard = exports.PaymentCardSchema = exports.seeds = void 0;
const mongoose_1 = require("mongoose");
const database_1 = require("../database");
const Account_1 = require("./Account");
const Entity_1 = require("./Entity");
const PaymentCardCredit_1 = require("./PaymentCardCredit");
const PaymentCardDebit_1 = require("./PaymentCardDebit");
const PaymentCardPrepaid_1 = require("./PaymentCardPrepaid");
var PaymentCardStatus;
(function (PaymentCardStatus) {
    PaymentCardStatus["ACTIVE"] = "ACTIVE";
    PaymentCardStatus["INACTIVE"] = "INACTIVE";
    PaymentCardStatus["EXPIRED"] = "EXPIRED";
})(PaymentCardStatus || (PaymentCardStatus = {}));
var PaymentCardTypes;
(function (PaymentCardTypes) {
    PaymentCardTypes["DEBIT"] = "debit";
    PaymentCardTypes["CREDIT"] = "credit";
    PaymentCardTypes["PREPAID"] = "prepaid";
})(PaymentCardTypes || (PaymentCardTypes = {}));
exports.seeds = {
    [PaymentCardTypes.DEBIT]: PaymentCardDebit_1.seeds,
    [PaymentCardTypes.CREDIT]: PaymentCardCredit_1.seeds,
    [PaymentCardTypes.PREPAID]: PaymentCardPrepaid_1.seeds,
};
const schemaOptions = Object.assign({}, database_1.defaultSchemaOptions);
schemaOptions.toJSON.getters = true;
exports.PaymentCardSchema = new mongoose_1.Schema({
    name: { type: String },
    number: { type: String, max: 16 },
    expDate: { type: String },
    ownerAccountId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Account' },
    userEntityId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Entity' },
    serviceEntityId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Entity' },
    //adminEntityId: { type: Schema.Types.ObjectId, ref: 'PaymentCard' }, // DC=Company | CC=Company/null | PPC=Sube/Previaje=>MinTransporte / GiftVoucher=>Company
    balance: {
        type: Number, required: true,
        get: v => (v / 100).toFixed(2),
        set: v => v * 100,
    },
    status: { type: String, enum: PaymentCardStatus, default: PaymentCardStatus.ACTIVE, required: true },
    debit: PaymentCardDebit_1.PaymentCardDebitSchema,
    credit: PaymentCardCredit_1.PaymentCardCreditSchema,
    prepaid: PaymentCardPrepaid_1.PaymentCardPrepaidSchema,
}, schemaOptions);
/**
 *
 */
exports.PaymentCardSchema.methods.setOwnerAccount = function (accountData) {
    return __awaiter(this, void 0, void 0, function* () {
        let ownerAccount;
        if (accountData instanceof Account_1.Account)
            ownerAccount = accountData;
        else {
            const pipelines = [];
            for (const field in accountData) {
                pipelines.push({ $lookup: { from: "entities", localField: field + "Id", foreignField: "_id", as: field } });
                pipelines.push({ $unwind: '$' + field });
                for (const subfield in accountData[field]) {
                    accountData[field + '.' + subfield] = accountData[field][subfield];
                }
                delete accountData[field];
            }
            pipelines.push({ $match: accountData });
            ownerAccount = (yield Account_1.Account.aggregate(pipelines).limit(1).exec()).shift();
        }
        if (!ownerAccount) {
            throw new Error(`Account doesn't exist (${JSON.stringify(accountData)}).`);
        }
        this.ownerAccountId = ownerAccount._id;
        return this;
    });
};
/**
 *
 */
exports.PaymentCardSchema.methods.unsetUserEntity = function () {
    return __awaiter(this, void 0, void 0, function* () {
        return this.setUserEntity(null);
    });
};
/**
 *
 */
exports.PaymentCardSchema.methods.unsetServiceEntity = function () {
    return __awaiter(this, void 0, void 0, function* () {
        return this.setServiceEntity(null);
    });
};
/**
 *
 */
exports.PaymentCardSchema.methods.setServiceEntity = function (entityData) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!entityData)
            this.serviceEntityId = null;
        else {
            const serviceEntity = (entityData instanceof Entity_1.EntityModel)
                ? entityData : yield Entity_1.Entity.findOne(entityData);
            if (!serviceEntity) {
                throw new Error(`Entity doesn't exist (${JSON.stringify(entityData)}).`);
            }
            this.serviceEntityId = serviceEntity.id;
        }
        return this;
    });
};
/**
 *
 */
exports.PaymentCardSchema.methods.setAdminEntity = function (entityData) {
    return __awaiter(this, void 0, void 0, function* () {
        const adminEntity = (entityData instanceof Entity_1.EntityModel)
            ? entityData : yield Entity_1.Entity.findOne(entityData);
        if (!adminEntity) {
            throw new Error(`Entity doesn't exist (${JSON.stringify(entityData)}).`);
        }
        this.adminEntityId = adminEntity.id;
        return this;
    });
};
/**
 *
 */
exports.PaymentCardSchema.methods.setUserEntity = function (entityData) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!entityData)
            this.serviceEntityId = null;
        else {
            const userEntity = (entityData instanceof Entity_1.EntityModel)
                ? entityData : yield Entity_1.Entity.findOne(entityData);
            if (!userEntity) {
                throw new Error(`Entity doesn't exist (${JSON.stringify(entityData)}).`);
            }
            this.userEntityId = userEntity.id;
        }
        return this;
    });
};
/**
 *
 */
exports.PaymentCardSchema.statics.seed = function (seeds) {
    return __awaiter(this, void 0, void 0, function* () {
        const paymentCards = yield this.insertMany(seeds);
        for (const i in seeds) {
            const seed = seeds[i];
            const paymentcard = paymentCards[i];
            if (!seed.ownerAccount)
                throw new Error(`PaymentCard's ownerAccount is required.`);
            // if (!seed.serviceEntity)
            //     throw new Error(`PaymentCard's serviceEntity is required.`)
            yield Promise.all([
                paymentcard.setOwnerAccount(seed.ownerAccount),
                paymentcard.setUserEntity(seed.userEntity),
                paymentcard.setServiceEntity(seed.serviceEntity),
            ]);
            yield paymentcard.save();
        }
    });
};
exports.PaymentCard = (0, mongoose_1.model)('PaymentCard', exports.PaymentCardSchema);
