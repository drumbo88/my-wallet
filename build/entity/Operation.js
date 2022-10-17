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
exports.Operation = exports.TransactionAssignation = exports.ObjectItemAssignation = void 0;
const typeorm_1 = require("typeorm");
const OperationItem_1 = require("./OperationItem");
const PersonEntity_1 = require("./PersonEntity");
const Transaction_1 = require("./Transaction");
const database_1 = require("../database");
const repoOperationItem = database_1.AppDataSource.getRepository(OperationItem_1.OperationItem);
const repoTransaction = database_1.AppDataSource.getRepository(Transaction_1.Transaction);
var OperationTypes;
(function (OperationTypes) {
    OperationTypes[OperationTypes["TRADE"] = 1] = "TRADE";
    OperationTypes[OperationTypes["EXCHANGE"] = 2] = "EXCHANGE";
})(OperationTypes || (OperationTypes = {}));
var OperationStatus;
(function (OperationStatus) {
    OperationStatus[OperationStatus["CREATED"] = 1] = "CREATED";
    OperationStatus[OperationStatus["PAID"] = 2] = "PAID";
    OperationStatus[OperationStatus["COMPLETED"] = 3] = "COMPLETED";
    OperationStatus[OperationStatus["CANCELLED"] = 4] = "CANCELLED";
})(OperationStatus || (OperationStatus = {}));
class ObjectItemAssignation {
    constructor(data = {}) {
        this.item = data.item;
        this.quantity = data.quantity;
    }
}
__decorate([
    (0, typeorm_1.ManyToOne)(type => OperationItem_1.OperationItem, { eager: true }),
    __metadata("design:type", OperationItem_1.OperationItem)
], ObjectItemAssignation.prototype, "item", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ObjectItemAssignation.prototype, "quantity", void 0);
exports.ObjectItemAssignation = ObjectItemAssignation;
class TransactionAssignation {
    constructor(data = {}) {
        this.transaction = data.transaction;
        this.amount = data.amount;
    }
}
__decorate([
    (0, typeorm_1.ManyToOne)(type => Transaction_1.Transaction, { eager: true }),
    __metadata("design:type", Transaction_1.Transaction)
], TransactionAssignation.prototype, "transaction", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TransactionAssignation.prototype, "amount", void 0);
exports.TransactionAssignation = TransactionAssignation;
let Operation = class Operation {
    constructor(data = {}) {
        // this.id = ObjectID.createFromTime(new Date().getUTCSeconds())
        const { datetime, type, detail, status } = data;
        this.datetime = datetime;
        this.type = type;
        this.detail = detail;
        this.status = status || null;
    }
    static init(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fromPersonEntity, toPersonEntity, items, transactions } = data, thisData = __rest(data, ["fromPersonEntity", "toPersonEntity", "items", "transactions"]);
            const obj = new this(thisData);
            obj.items = [];
            obj.transactions = [];
            obj.fromPersonEntity = yield PersonEntity_1.PersonEntity.getOne(fromPersonEntity);
            obj.toPersonEntity = yield PersonEntity_1.PersonEntity.getOne(toPersonEntity);
            if (items === null || items === void 0 ? void 0 : items.length) {
                for (const itemAsigData of items) {
                    const { quantity } = itemAsigData, itemData = __rest(itemAsigData, ["quantity"]);
                    const item = yield repoOperationItem.findOneOrFail(itemData);
                    obj.items.push(new ObjectItemAssignation({ item, quantity }));
                }
            }
            if (transactions === null || transactions === void 0 ? void 0 : transactions.length) {
                for (const transactionAsigData of transactions) {
                    const { amount } = transactionAsigData, transactionData = __rest(transactionAsigData, ["amount"]);
                    const transaction = yield repoTransaction.findOneOrFail(transactionData);
                    obj.transactions.push(new TransactionAssignation({ transaction, amount }));
                }
            }
            return obj;
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const repoOperation = database_1.AppDataSource.getRepository(this.constructor);
            return yield repoOperation.save(this);
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
], Operation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Operation.prototype, "datetime", void 0);
__decorate([
    (0, typeorm_1.Column)({ enum: OperationTypes }),
    __metadata("design:type", Number)
], Operation.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => PersonEntity_1.PersonEntity, { eager: true }),
    __metadata("design:type", PersonEntity_1.PersonEntity)
], Operation.prototype, "fromPersonEntity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => PersonEntity_1.PersonEntity, { eager: true }),
    __metadata("design:type", PersonEntity_1.PersonEntity)
], Operation.prototype, "toPersonEntity", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Operation.prototype, "detail", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: [] }),
    __metadata("design:type", Array)
], Operation.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: [] }),
    __metadata("design:type", Array)
], Operation.prototype, "transactions", void 0);
__decorate([
    (0, typeorm_1.Column)({ enum: OperationStatus, default: OperationStatus.CREATED }),
    __metadata("design:type", Number)
], Operation.prototype, "status", void 0);
Operation = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Operation);
exports.Operation = Operation;
;
/*
  +class.createTradeOperation()
  +class.createExchangeOperation()

  +object.addItem({})
  +object.removeItem({})
  +object.setItems([{}])

  +object.pay()
  +object.cancel()

  -object.updateStatus()

------------------------
{
  date: '2022-10-10',
  type: 'Trade', // 1 o más transacciones unidireccionales (salvo devolución) (Compra: envio pago (->) | Venta: recibo pago (<-))
  fromEntity & toEntity: Person | Company,
  detail: 'Compra de bien o servicio',
  amount: 5k,
  transactions: [{
    { date: ..., fromAccount: miBBVA, toAccount: suBanco, currency: ARS, amount: 5k }
  }],
},
{
  date: '2022-10-10',
  type: 'Exchange', // 2 transacciones (Compra: envio pago (->) + liberación (<-) | Venta: recibo pago (<-) + liberación (->))
  fromEntity & toEntity: Person | Company,
  detail: 'Compra de cripto',
  amount: null, // Opcional
  transactions: [{
    { date: ..., fromAccount: miMP, toAccount: suMP, currency: ARS, amount: 5k }
    { date: ..., fromAccount: suBinance, toAccount: miBinance, currency: USDT, amount: 17.5438596 }
  }],
}
{
  date: '2022-10-10',
  type: 'Exchange', // 2 transacciones (Compra: envio pago (->) + liberación (<-) | Venta: recibo pago (<-) + liberación (->))
  fromEntity & toEntity: Person | Company,
  detail: 'Compra de dólares',
  transactions: [{
    { date: ..., fromAccount: miArsBBVA, toAccount: suBank, currency: ARS, amount: 5k }
    { date: ..., fromAccount: suBank, toAccount: miUsdBBVA, currency: USD, amount: 17.5438596 }
  }],
}
*/
