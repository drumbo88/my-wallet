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
exports.PaymentCard = void 0;
const typeorm_1 = require("typeorm");
const PersonEntity_1 = require("./PersonEntity");
const database_1 = require("../database");
var PaymentCardStatus;
(function (PaymentCardStatus) {
    PaymentCardStatus[PaymentCardStatus["INACTIVE"] = 0] = "INACTIVE";
    PaymentCardStatus[PaymentCardStatus["ACTIVE"] = 1] = "ACTIVE";
    PaymentCardStatus[PaymentCardStatus["EXPIRED"] = 2] = "EXPIRED";
})(PaymentCardStatus || (PaymentCardStatus = {}));
let PaymentCard = class PaymentCard {
    constructor(data = {}) {
        // this.id = ObjectID.createFromTime(new Date().getUTCSeconds())
        const { fullname, expirationDate, status, balance, ownerPersonEntity, servicePersonEntity, administratorPersonEntity, cardDebit, cardCredit, cardPrepaid } = data;
        this.fullname = fullname;
        this.expirationDate = expirationDate;
        this.status = status;
        this.balance = balance;
        this.ownerPersonEntity = ownerPersonEntity;
        this.servicePersonEntity = servicePersonEntity;
        this.administratorPersonEntity = administratorPersonEntity;
        this.cardDebit = cardDebit;
        this.cardCredit = cardCredit;
        this.cardPrepaid = cardPrepaid;
    }
    static init(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new this(data);
        });
    }
    static getOne(data) {
        if (data instanceof this) {
            return data;
        }
        else {
            const filter = { where: (typeof data == 'string') ? { number: data } : data };
            return database_1.AppDataSource.getRepository(this).findOneOrFail(filter);
        }
    }
};
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", typeorm_1.ObjectID)
], PaymentCard.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], PaymentCard.prototype, "number", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], PaymentCard.prototype, "fullname", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], PaymentCard.prototype, "expirationDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ enum: PaymentCardStatus, default: PaymentCardStatus.ACTIVE }),
    __metadata("design:type", Number)
], PaymentCard.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => PersonEntity_1.PersonEntity, { eager: true }),
    __metadata("design:type", PersonEntity_1.PersonEntity)
], PaymentCard.prototype, "ownerPersonEntity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => PersonEntity_1.PersonEntity, { nullable: true, eager: true }),
    __metadata("design:type", Object)
], PaymentCard.prototype, "servicePersonEntity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => PersonEntity_1.PersonEntity, { nullable: true, eager: true }),
    __metadata("design:type", Object)
], PaymentCard.prototype, "administratorPersonEntity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], PaymentCard.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, unique: true }),
    __metadata("design:type", Object)
], PaymentCard.prototype, "cardDebit", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, unique: true }),
    __metadata("design:type", Object)
], PaymentCard.prototype, "cardPrepaid", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, unique: true }),
    __metadata("design:type", Object)
], PaymentCard.prototype, "cardCredit", void 0);
PaymentCard = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], PaymentCard);
exports.PaymentCard = PaymentCard;
/*
const schema = new Schema({
    fullname: { type: String },
    number: { type: Number },
    expDate: { type: String },
    userEntity: { type: Schema.Types.ObjectId, ref: 'Entity', required: true }, //
    serviceEntity: { type: Schema.Types.ObjectId, ref: 'Entity' }, // (opt.) Visa / Mastercard
    adminEntity: { type: Schema.Types.ObjectId, ref: 'Entity', required: true }, // DC=Company | CC=Company/null | PPC=Sube/Previaje=>MinTransporte / GiftVoucher=>Company
    balance: { type: Number, required: true },

    limits: {
        payment: {
            day: { type: Number, min: 0 },
            week: { type: Number, min: 0 },
            month: { type: Number, min: 0 },
            all: { type: Number, min: 0 },
        },
        extraction: {
            day: { type: Number, min: 0 },
            week: { type: Number, min: 0 },
            month: { type: Number, min: 0 },
            all: { type: Number, min: 0 },
        },
    },
    // excluyent types: ['PREPAID', 'DEBIT', 'CREDIT'],
    debit: {

    },
    prepaid: {
        fundable: { type: Boolean, required: true }, // can add funds
    },
    credit: {
        period: { type: String, default: '1 month' },
    },
})
*/ 
