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
exports.Account = void 0;
const typeorm_1 = require("typeorm");
const Asset_1 = require("./Asset");
const Currency_1 = require("./Currency");
const PersonEntity_1 = require("./PersonEntity");
const database_1 = require("../database");
const repoAsset = database_1.AppDataSource.getRepository(Asset_1.Asset);
var AccountStatus;
(function (AccountStatus) {
    AccountStatus[AccountStatus["INACTIVE"] = 0] = "INACTIVE";
    AccountStatus[AccountStatus["ACTIVE"] = 1] = "ACTIVE";
})(AccountStatus || (AccountStatus = {}));
var AccountTypes;
(function (AccountTypes) {
    AccountTypes[AccountTypes["FUNDS"] = 1] = "FUNDS";
    AccountTypes[AccountTypes["SPOT"] = 2] = "SPOT";
    AccountTypes[AccountTypes["EARN"] = 3] = "EARN";
    AccountTypes[AccountTypes["FIXED_TERM"] = 4] = "FIXED_TERM";
    AccountTypes[AccountTypes["CREDIT"] = 5] = "CREDIT";
})(AccountTypes || (AccountTypes = {}));
let Account = class Account {
    constructor(data = {}) {
        const { address, currency, alias, assets, type, status, balance, detail } = data;
        // this.id = ObjectID.createFromTime(new Date().getUTCSeconds())
        this.address = address;
        this.currency = currency;
        this.alias = alias;
        this.type = type;
        this.balance = balance;
        if (assets === null || assets === void 0 ? void 0 : assets.length) {
            this.assets = [];
            for (const assetData of assets) {
                this.assets.push(new Asset_1.Asset(assetData));
            }
        }
        this.status = status;
        this.detail = detail;
    }
    static init(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ownerPersonEntity, administratorPersonEntity, assets } = data, thisData = __rest(data, ["ownerPersonEntity", "administratorPersonEntity", "assets"]);
            const obj = new this(thisData);
            obj.ownerPersonEntity = yield PersonEntity_1.PersonEntity.getOne(ownerPersonEntity);
            obj.administratorPersonEntity = yield PersonEntity_1.PersonEntity.getOne(administratorPersonEntity);
            if (assets === null || assets === void 0 ? void 0 : assets.length) {
                for (const assetData of assets) {
                    const asset = yield repoAsset.findOneOrFail(assetData);
                    obj.assets.push(asset);
                }
            }
            return obj;
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const repoAccount = database_1.AppDataSource.getRepository(this.constructor);
            return yield repoAccount.save(this);
        });
    }
};
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", typeorm_1.ObjectID)
], Account.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, unique: true }),
    __metadata("design:type", Object)
], Account.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], Account.prototype, "alias", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: AccountStatus.ACTIVE }),
    __metadata("design:type", Number)
], Account.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => PersonEntity_1.PersonEntity),
    __metadata("design:type", PersonEntity_1.PersonEntity)
], Account.prototype, "ownerPersonEntity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => PersonEntity_1.PersonEntity),
    __metadata("design:type", PersonEntity_1.PersonEntity)
], Account.prototype, "administratorPersonEntity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => Currency_1.Currency, { nullable: true, eager: true }),
    __metadata("design:type", Object)
], Account.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: AccountTypes.FUNDS }),
    __metadata("design:type", Number)
], Account.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], Account.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: [] }),
    __metadata("design:type", Array)
], Account.prototype, "assets", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Account.prototype, "detail", void 0);
Account = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Account);
exports.Account = Account;
/* ToDo: Cada Account tendrá 1 asset (bancos) o más de un Asset (criptoBank)
    - funds: { currency, amount, ... }
    - fixedTerm: { currency, amount, ... }

    - funds: [{ currency, amount, ... }, ...]
    - spot: [{ currency, amount, ... }, ...]
    - earn: [{ currency, amount, ... }, ...]
*/
