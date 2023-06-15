"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var EntityBackend_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityModel = exports.EntityBackend = exports.seeds = void 0;
const mongoose_1 = require("mongoose");
const Account_1 = require("./Account");
const Person_1 = require("./Person");
const Company_1 = require("./Company");
const PaymentCard_1 = require("./PaymentCard");
exports.seeds = {
    [entity_1.EntityTypes.COMPANY]: Company_1.seeds,
    [entity_1.EntityTypes.PERSON]: Person_1.seeds,
};
const typegoose_1 = require("@typegoose/typegoose");
const entity_1 = require("common/types/entity");
const config_1 = require("src/config");
/*************************************************************************************
 * Clase abstracta "Entity" (Employee | Client)
 */
let EntityBackend = EntityBackend_1 = class EntityBackend extends entity_1.Entity {
    static createPerson(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.create(data);
        });
    }
    static createCompany(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.create(data);
        });
    }
    static getPeople(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // que person esté definido y company sea null
            if (!data.person)
                data.person = {};
            data.person.$exists = true;
            data.person.$ne = null;
            if (data.company)
                delete data.company;
            //data.$or = [ { company: { $exists: false } }, { company: { $in: ['', null] } } ]
            return yield exports.EntityModel.find(data);
        });
    }
    static getCompanies(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // que company esté definido y person sea null
            if (!data.company)
                data.company = {};
            data.company.$exists = true;
            data.company.$ne = null;
            if (data.person)
                delete data.person;
            //data.$or = [ { person: { $exists: false } }, { person: { $in: ['', null] } } ]
            return exports.EntityModel.find(data);
        });
    }
    addOwnedAccount(accountData) {
        return __awaiter(this, void 0, void 0, function* () {
            accountData.ownerEntityId = this.id;
            const adminEntity = (accountData.adminEntity instanceof (mongoose_1.Document))
                ? accountData.adminEntity : yield exports.EntityModel.findOne(accountData.adminEntity);
            if (!adminEntity) {
                throw new Error(`Entity doesn't exist (${JSON.stringify(accountData.adminEntity)}).`);
            }
            accountData.adminEntityId = adminEntity.id;
            yield Account_1.AccountModel.create(accountData);
            //console.log({accountData})
            //const document: Document<EntityBackend> = this.toObject();
            return this.toObject();
        });
    }
    addAdministratedAccount(accountData) {
        return __awaiter(this, void 0, void 0, function* () {
            accountData.adminEntityId = this._id;
            const ownedEntity = (accountData.adminEntity instanceof (mongoose_1.Document))
                ? accountData.adminEntity : yield exports.EntityModel.findOne(accountData.ownerEntity);
            if (!ownedEntity) {
                throw new Error(`Entity doesn't exist (${JSON.stringify(accountData.ownerEntity)}).`);
            }
            accountData.ownerEntityId = ownedEntity.id;
            yield Account_1.AccountModel.create(accountData);
            return this.toObject();
        });
    }
    /**
     * @accountData
     *  @value null: unique account / Error
     *  @value IAccount: Account to use
     */
    addCreditCard(creditCardData, accountData) {
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
            const account = (accountData instanceof Account_1.AccountModel)
                ? accountData : yield Account_1.AccountModel.findOne(accountData);
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
            return this.toObject();
        });
    }
};
__decorate([
    (0, typegoose_1.prop)({ type: String, unique: true, required: true })
], EntityBackend.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: entity_1.EntityStatus, required: true })
], EntityBackend.prototype, "status", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, unique: true, required: true })
], EntityBackend.prototype, "taxId", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, unique: true, required: true })
], EntityBackend.prototype, "user", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, alias: "currencyCode", ref: 'Currency' })
], EntityBackend.prototype, "currency", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Person_1.IPerson })
], EntityBackend.prototype, "person", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Company_1.ICompany })
], EntityBackend.prototype, "company", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => [Account_1.AccountBackend], ref: Account_1.AccountBackend, required: true, default: [] })
], EntityBackend.prototype, "accountsOwned", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => [Account_1.AccountBackend], ref: Account_1.AccountBackend, required: true, default: [] })
], EntityBackend.prototype, "accountsAdministrated", void 0);
EntityBackend = EntityBackend_1 = __decorate([
    (0, typegoose_1.modelOptions)(config_1.myModelOptions)
], EntityBackend);
exports.EntityBackend = EntityBackend;
// Genera el modelo a partir de la clase utilizando Typegoose
exports.EntityModel = (0, typegoose_1.getModelForClass)(EntityBackend);
/*export interface IEntity extends Entity {
    idsAccountsOwned?: Schema.Types.ObjectId[],
    idsAccountsAdministrated?: Schema.Types.ObjectId[],
    accountsOwned?: IAccount[],
    accountsAdministrated?: IAccount[],
}*/
