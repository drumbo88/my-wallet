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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Currency = void 0;
const typeorm_1 = require("typeorm");
const Country_1 = require("./Country");
const database_1 = require("../database");
const EntityInterface_1 = require("./EntityInterface");
const repoCountry = database_1.AppDataSource.getRepository(Country_1.Country);
var CurrencyTypes;
(function (CurrencyTypes) {
    CurrencyTypes["FIAT"] = "FIAT";
    CurrencyTypes["CRYPTO"] = "CRYPTO";
})(CurrencyTypes || (CurrencyTypes = {}));
let Currency = class Currency extends EntityInterface_1.EntityAbstract {
    constructor(data = {}) {
        super();
        // this.id = ObjectID.createFromTime(new Date().getUTCSeconds())
        const { code, symbol, name, value, api, type } = data;
        this.code = code;
        this.symbol = symbol;
        this.name = name;
        this.value = value;
        this.api = api;
        this.type = type || CurrencyTypes.FIAT;
        //this.countries = []
    }
    // ROOT CLASS (to seed)
    static init(data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = new this(data);
            const { countries } = data;
            obj.countries = [];
            if (countries === null || countries === void 0 ? void 0 : countries.length) {
                for (const countryData of countries) {
                    const country = yield repoCountry.findOneOrFail({ where: { code: countryData } });
                    obj.countries.push(country);
                }
            }
            return obj;
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const repoCurrency = database_1.AppDataSource.getRepository(this.constructor);
            return yield repoCurrency.save(this);
        });
    }
    static getOne(data) {
        if (data instanceof this) {
            return data;
        }
        else {
            const filter = { where: (typeof data == 'string') ? { code: data } : data };
            return database_1.AppDataSource.getRepository(this).findOneOrFail(filter);
        }
    }
};
Currency.seeds = [
    { code: 'ARS', symbol: '$', name: 'Peso Argentino', value: 1 / 150 },
    { code: 'USD', symbol: '$', name: 'Dólar Estadounidense', value: 1 },
    { code: 'BTC', symbol: '₿', name: 'Bitcoin', value: 23000, type: CurrencyTypes.CRYPTO },
];
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", typeorm_1.ObjectID)
], Currency.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Unique)(["code"]),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Currency.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Currency.prototype, "symbol", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Currency.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Currency.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], Currency.prototype, "api", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Currency.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => Country_1.Country, (obj) => obj.currencies),
    __metadata("design:type", Array)
], Currency.prototype, "countries", void 0);
Currency = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Currency);
exports.Currency = Currency;
