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
exports.PaymentCardCredit = void 0;
const typeorm_1 = require("typeorm");
const PaymentCard_1 = require("./PaymentCard");
const database_1 = require("../database");
class PaymentCardCredit {
    constructor(data = {}) {
        const { period } = data;
        this.period = period;
    }
    static init(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fullname, expirationDate, status, balance, ownerPersonEntity, servicePersonEntity, administratorPersonEntity, cardDebit, cardCredit, cardPrepaid } = data, thisData = __rest(data, ["fullname", "expirationDate", "status", "balance", "ownerPersonEntity", "servicePersonEntity", "administratorPersonEntity", "cardDebit", "cardCredit", "cardPrepaid"]);
            const obj = new this(thisData);
            obj.paymentCard = yield PaymentCard_1.PaymentCard.init({
                fullname, expirationDate, status, balance,
                ownerPersonEntity, servicePersonEntity, administratorPersonEntity,
                cardDebit, cardCredit: obj, cardPrepaid
            });
            return obj;
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const repoPaymentCard = database_1.AppDataSource.getRepository(PaymentCard_1.PaymentCard);
            return yield repoPaymentCard.save(Object.assign(Object.assign({}, this.paymentCard), { cardCredit: this }));
        });
    }
    static getOne(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data instanceof this) {
                return data;
            }
            else {
                const filter = { where: (typeof data == 'string') ? { number: data } : data };
                const personEntity = yield database_1.AppDataSource.getRepository(PaymentCard_1.PaymentCard).findOneOrFail(filter);
                return personEntity.cardCredit;
            }
        });
    }
}
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PaymentCardCredit.prototype, "period", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(type => PaymentCard_1.PaymentCard),
    __metadata("design:type", PaymentCard_1.PaymentCard)
], PaymentCardCredit.prototype, "paymentCard", void 0);
exports.PaymentCardCredit = PaymentCardCredit;
