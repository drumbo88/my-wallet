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
exports.Company = void 0;
const typeorm_1 = require("typeorm");
const database_1 = require("../database");
const PersonEntity_1 = require("./PersonEntity");
var CompanyTypes;
(function (CompanyTypes) {
    CompanyTypes["COMPANY"] = "company";
    CompanyTypes["E_WALLET"] = "e-wallet";
    CompanyTypes["BANK"] = "bank";
    CompanyTypes["CRYPTO_WALLET"] = "crypto-wallet";
    CompanyTypes["CRYPTO_EXCHANGE"] = "crypto-exchange";
})(CompanyTypes || (CompanyTypes = {}));
class Company {
    constructor(data = {}) {
        const { name, shortName, alias, type } = data;
        this.name = name;
        this.shortName = shortName;
        this.alias = alias;
        this.type = type;
    }
    static init(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { taxId, user } = data, thisData = __rest(data, ["taxId", "user"]);
            const obj = new this(thisData);
            //obj.personEntity = await PersonEntity.getOne({ taxId, user })
            obj.personEntity = yield PersonEntity_1.PersonEntity.init({ taxId, user });
            return obj;
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const repoPersonEntity = database_1.AppDataSource.getRepository(PersonEntity_1.PersonEntity);
            return yield repoPersonEntity.save(Object.assign(Object.assign({}, this.personEntity), { company: this }));
        });
    }
    static getOne(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data instanceof this) {
                return data;
            }
            else {
                const filter = { where: (typeof data == 'string') ? { taxId: data } : data };
                const personEntity = yield database_1.AppDataSource.getRepository(PersonEntity_1.PersonEntity).findOneOrFail(filter);
                return personEntity.company;
            }
        });
    }
    static count() {
        return __awaiter(this, void 0, void 0, function* () {
            return PersonEntity_1.PersonEntity.count({ where: { company: !(0, typeorm_1.IsNull)() } });
        });
    }
}
Company.seeds = [
    {
        name: 'BBVA Francés',
        taxId: '30500003193',
        type: 'Bank',
    },
    {
        name: 'Foncap SA',
        taxId: '30692317714',
        /*accounts: [{
          adminEntity: { taxId: '30500003193' },
        }]*/
    },
    {
        name: 'Binance',
        type: 'CryptoExchange',
    },
];
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Company.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Company.prototype, "shortName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], Company.prototype, "alias", void 0);
__decorate([
    (0, typeorm_1.Column)({ enum: CompanyTypes }),
    __metadata("design:type", String)
], Company.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(type => PersonEntity_1.PersonEntity),
    __metadata("design:type", PersonEntity_1.PersonEntity)
], Company.prototype, "personEntity", void 0);
exports.Company = Company;
