"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonEntity = void 0;
const typeorm_1 = require("typeorm");
const Currency_1 = require("./Currency");
const Account_1 = require("./Account");
const User_1 = require("./User");
const database_1 = require("../database");
const EntityInterface_1 = require("./EntityInterface");
var PersonEntityStatus;
(function (PersonEntityStatus) {
    PersonEntityStatus[PersonEntityStatus["INACTIVE"] = 0] = "INACTIVE";
    PersonEntityStatus[PersonEntityStatus["ACTIVE"] = 1] = "ACTIVE";
})(PersonEntityStatus || (PersonEntityStatus = {}));
let PersonEntity = class PersonEntity extends EntityInterface_1.EntityAbstract {
    constructor(data = {}) {
        super();
        // this.id = ObjectID.createFromTime(new Date().getUTCSeconds())
        const { taxId, currency, person, company, status } = data;
        this.taxId = taxId;
        this.currency = currency;
        this.person = person;
        this.company = company;
        this.status = status;
    }
    static init(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { accountsOwned, accountsAdministrated, user } = data, thisData = __rest(data, ["accountsOwned", "accountsAdministrated", "user"]);
            const obj = new this(thisData);
            obj.user = yield User_1.User.init(Object.assign({ personEntity: this }, user));
            obj.accountsOwned = [];
            obj.accountsAdministrated = [];
            if (accountsOwned === null || accountsOwned === void 0 ? void 0 : accountsOwned.length) {
                for (const accountData of accountsOwned) {
                    obj.accountsOwned.push(new Account_1.Account(accountData));
                }
            }
            if (accountsAdministrated === null || accountsAdministrated === void 0 ? void 0 : accountsAdministrated.length) {
                for (const accountData of accountsAdministrated) {
                    obj.accountsAdministrated.push(new Account_1.Account(accountData));
                }
            }
            return obj;
        });
    }
    static getOne(data) {
        if (data instanceof this) {
            return data;
        }
        else {
            const filter = { where: (typeof data == 'string') ? { id: data } : data };
            return database_1.AppDataSource.getRepository(this).findOneOrFail(filter);
        }
    }
};
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", typeorm_1.ObjectID)
], PersonEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, unique: true }),
    __metadata("design:type", Object)
], PersonEntity.prototype, "taxId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, unique: true }),
    __metadata("design:type", Object)
], PersonEntity.prototype, "person", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, unique: true }),
    __metadata("design:type", Object)
], PersonEntity.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, unique: true }),
    __metadata("design:type", Object)
], PersonEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => Currency_1.Currency, { nullable: true, eager: true }),
    __metadata("design:type", Object)
], PersonEntity.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => Account_1.Account, obj => obj.ownerPersonEntity, { nullable: true, eager: true }),
    (0, typeorm_1.Column)({ default: [] }),
    __metadata("design:type", Array)
], PersonEntity.prototype, "accountsOwned", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => Account_1.Account, obj => obj.administratorPersonEntity, { nullable: true, eager: true }),
    (0, typeorm_1.Column)({ default: [] }),
    __metadata("design:type", Array)
], PersonEntity.prototype, "accountsAdministrated", void 0);
__decorate([
    (0, typeorm_1.Column)({ enum: PersonEntityStatus, default: PersonEntityStatus.ACTIVE }),
    __metadata("design:type", Number)
], PersonEntity.prototype, "status", void 0);
PersonEntity = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], PersonEntity);
exports.PersonEntity = PersonEntity;
