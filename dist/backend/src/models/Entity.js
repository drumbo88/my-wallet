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
exports.Entity = exports.EntityModel = exports.EntitySchema = exports.seeds = exports.EntityTypes = exports.EntityStatus = void 0;
const mongoose_1 = require("mongoose");
const User_1 = require("./User");
const Account_1 = require("./Account");
const Person_1 = require("./Person");
const Company_1 = require("./Company");
const database_1 = require("../database");
const PaymentCard_1 = require("./PaymentCard");
var EntityStatus;
(function (EntityStatus) {
    EntityStatus["ACTIVE"] = "ACTIVE";
    EntityStatus["INACTIVE"] = "INACTIVE";
})(EntityStatus = exports.EntityStatus || (exports.EntityStatus = {}));
var EntityTypes;
(function (EntityTypes) {
    EntityTypes["PERSON"] = "person";
    EntityTypes["COMPANY"] = "company";
})(EntityTypes = exports.EntityTypes || (exports.EntityTypes = {}));
exports.seeds = {
    [EntityTypes.COMPANY]: Company_1.seeds,
    [EntityTypes.PERSON]: Person_1.seeds,
};
exports.EntitySchema = new mongoose_1.Schema({
    name: { type: String, unique: true, sparse: true },
    status: { type: String, enum: EntityStatus, default: EntityStatus.ACTIVE },
    taxId: { type: String, unique: true, sparse: true },
    user: User_1.schema,
    currency: { type: String, alias: "currencyCode", ref: 'Currency' },
    person: Person_1.PersonSchema,
    company: Company_1.CompanySchema
}, database_1.defaultSchemaOptions);
class EntityModel extends database_1.MyModel {
    static seed(seeds) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const retOne = !Array.isArray(seeds);
            if (retOne)
                seeds = [seeds];
            const entities = yield exports.Entity.insertMany(seeds);
            for (const i in seeds) {
                const seed = seeds[i];
                const entity = entities[i];
                if ((_a = seed.accountsOwned) === null || _a === void 0 ? void 0 : _a.length) {
                    //console.log({seed})
                    for (const accData of seed.accountsOwned)
                        yield entity.addOwnedAccount(accData);
                }
                if ((_b = seed.accountsAdministrated) === null || _b === void 0 ? void 0 : _b.length) {
                    for (const accData of seed.accountsAdministrated)
                        yield entity.addAdministratedAccount(accData);
                }
                yield entity.save();
            }
            return retOne ? entities.pop() : entities;
        });
    }
}
exports.EntityModel = EntityModel;
// export interface IEntityDocument extends Document<EntityModel>, IEntity {
//     // statics & methods
//     addOwnedAccount(accountData: IAccount): Promise<IEntityDocument>,
//     addAdministratedAccount(accountData: IAccount): Promise<IEntityDocument>,
// }
/**
 * GET
 */
exports.EntitySchema.statics.getPeople = function (data) {
    return __awaiter(this, void 0, void 0, function* () {
        // que person esté definido y company sea null
        if (!data.person)
            data.person = {};
        data.person.$exists = true;
        data.person.$ne = null;
        if (data.company)
            delete data.company;
        //data.$or = [ { company: { $exists: false } }, { company: { $in: ['', null] } } ]
        return yield exports.Entity.find(data);
    });
};
exports.EntitySchema.statics.getCompanies = function (data) {
    return __awaiter(this, void 0, void 0, function* () {
        // que company esté definido y person sea null
        if (!data.company)
            data.company = {};
        data.company.$exists = true;
        data.company.$ne = null;
        if (data.person)
            delete data.person;
        //data.$or = [ { person: { $exists: false } }, { person: { $in: ['', null] } } ]
        return exports.Entity.find(data);
    });
};
exports.EntitySchema.statics.createPerson = function (data) {
    return __awaiter(this, void 0, void 0, function* () {
    });
};
exports.EntitySchema.statics.createCompany = function (data) {
    return __awaiter(this, void 0, void 0, function* () {
    });
};
exports.EntitySchema.virtual('accountsOwned', {
    ref: 'Account', localField: '_id', foreignField: 'ownerEntityId',
});
exports.EntitySchema.virtual('accountsAdministrated', {
    ref: 'Account', localField: '_id', foreignField: 'adminEntityId',
});
exports.EntitySchema.methods.addOwnedAccount = function (accountData) {
    return __awaiter(this, void 0, void 0, function* () {
        accountData.ownerEntityId = this._id;
        const adminEntity = (accountData.adminEntity instanceof EntityModel)
            ? accountData.adminEntity : yield exports.Entity.findOne(accountData.adminEntity);
        if (!adminEntity) {
            throw new Error(`Entity doesn't exist (${JSON.stringify(accountData.adminEntity)}).`);
        }
        accountData.adminEntityId = adminEntity.id;
        yield Account_1.Account.create(accountData);
        //console.log({accountData})
        return this;
    });
};
exports.EntitySchema.methods.addAdministratedAccount = function (accountData) {
    return __awaiter(this, void 0, void 0, function* () {
        accountData.adminEntityId = this._id;
        const ownedEntity = (accountData.adminEntity instanceof EntityModel)
            ? accountData.adminEntity : yield exports.Entity.findOne(accountData.ownerEntity);
        if (!ownedEntity) {
            throw new Error(`Entity doesn't exist (${JSON.stringify(accountData.ownerEntity)}).`);
        }
        accountData.ownerEntityId = ownedEntity.id;
        yield Account_1.Account.create(accountData);
        return this;
    });
};
/**
 * @accountData
 *  @value null: unique account / Error
 *  @value IAccount: Account to use
 */
exports.EntitySchema.methods.addCreditCard = function (creditCardData, accountData) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!accountData) {
            switch (this.accountsOwned.length) {
                case 0:
                    throw new Error(`Entity doesn't have an Account to add the card (${JSON.stringify(creditCardData)}).`);
                case 1:
                    accountData = this.accountsOwned[0];
                default:
                    throw new Error(`Must specify which Account does the card belong (${JSON.stringify(creditCardData)}).`);
            }
        }
        const account = (accountData instanceof Account_1.Account)
            ? accountData : yield Account_1.Account.findOne(accountData);
        if (!account) {
            throw new Error(`Entity doesn't exist (${JSON.stringify(accountData.ownerEntity)}).`);
        }
        if (account.ownerEntityId != this.id) {
            throw new Error(`The Account to add the card should be owned by the same Entity (${JSON.stringify({ this: this.id, accOwnerId: account.ownerEntityId })}).`);
        }
        if (account.ownerEntityId != creditCardData.ownerEntityId) {
            throw new Error(`The Account to add the card should be owned by the same Entity (${JSON.stringify({ this: this.id, accOwnerId: account.ownerEntityId })}).`);
        }
        creditCardData = creditCardData;
        yield PaymentCard_1.PaymentCard.create(accountData);
        console.log('Account created');
        return this;
    });
};
exports.EntitySchema.statics.seed = EntityModel.seed;
exports.Entity = (0, mongoose_1.model)('Entity', exports.EntitySchema);
