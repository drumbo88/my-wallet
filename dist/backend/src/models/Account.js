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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModel = exports.AccountBackend = void 0;
const Entity_1 = require("./Entity");
const PaymentCard_1 = require("./PaymentCard");
const Wallet_1 = require("./Wallet");
const Account_1 = require("common/Types/Account");
const typegoose_1 = require("@typegoose/typegoose");
const config_1 = require("src/config");
const entity_1 = require("common/src/types/entity");
// import { EntityRefSchema } from './Entity'
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
/*************************************************************************************
 * Clase "Account"
 */
let AccountBackend = class AccountBackend extends Account_1.Account {
    // Método abstracto para obtener el tipo de persona
    getByOwner(entityData) {
        return __awaiter(this, void 0, void 0, function* () {
            const ownerEntity = (entityData instanceof entity_1.Entity)
                ? entityData : yield entity_1.Entity.findOne(entityData);
            if (!ownerEntity) {
                throw new Error(`Entity doesn't exist (${JSON.stringify(entityData)}).`);
            }
            return ownerEntity;
        });
    }
    // Método abstracto para obtener el tipo de persona
    getTipo() {
        throw new Error('El método getTipo() debe ser implementado por las clases hijas');
    }
};
__decorate([
    (0, typegoose_1.prop)()
], AccountBackend.prototype, "id", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Account_1.AccountStatus, required: true })
], AccountBackend.prototype, "status", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Account_1.AccountTypes, required: true })
], AccountBackend.prototype, "type", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: entity_1.Entity })
], AccountBackend.prototype, "adminEntity", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: entity_1.Entity })
], AccountBackend.prototype, "ownerEntity", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: [Wallet_1.schema] })
], AccountBackend.prototype, "wallets", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: [PaymentCard_1.PaymentCard] })
], AccountBackend.prototype, "paymentCards", void 0);
AccountBackend = __decorate([
    (0, typegoose_1.modelOptions)(config_1.myModelOptions)
], AccountBackend);
exports.AccountBackend = AccountBackend;
// Genera el modelo a partir de la clase utilizando Typegoose
exports.AccountModel = (0, typegoose_1.getModelForClass)(AccountBackend);
