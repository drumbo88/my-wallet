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
exports.Country = void 0;
const typeorm_1 = require("typeorm");
const Currency_1 = require("./Currency");
const database_1 = require("../database");
const EntityInterface_1 = require("./EntityInterface");
const repoCurrency = database_1.AppDataSource.getRepository(Currency_1.Currency);
let Country = class Country extends EntityInterface_1.EntityAbstract {
    constructor(data = {}) {
        super();
        // this.id = ObjectID.createFromTime(new Date().getUTCSeconds())
        const { code, name } = data;
        this.code = code;
        this.name = name;
    }
    // ROOT CLASS (to seed)
    static init(data) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const obj = new this(data);
            obj.currencies = [];
            if ((_a = data.currencies) === null || _a === void 0 ? void 0 : _a.length) {
                for (const currencyData of data.currencies) {
                    const currency = yield Currency_1.Currency.getOne(currencyData);
                    obj.currencies.push(currency);
                }
            }
            return obj;
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const repoCountry = database_1.AppDataSource.getRepository(this.constructor);
            return yield repoCountry.save(this);
        });
    }
    static getOne(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data instanceof this) {
                return data;
            }
            else {
                const filter = { where: (typeof data == 'string') ? { code: data } : data };
                return yield database_1.AppDataSource.getRepository(this).findOneOrFail(filter);
            }
        });
    }
};
Country.seeds = [
    { code: 'ARG', name: 'Argentina', currencies: ['ARS'] },
    { code: 'USA', name: 'Estados Unidos', currencies: ['USD'] },
];
__decorate([
    (0, typeorm_1.ObjectIdColumn)() // ToDo: use symbol column as PK instead?
    ,
    __metadata("design:type", typeorm_1.ObjectID)
], Country.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Country.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Country.prototype, "name", void 0);
Country = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Country);
exports.Country = Country;
