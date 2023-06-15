"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.seeds = exports.schema = exports.Operation = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const database_1 = require("../database");
const Asset_1 = require("./Asset");
const Entity_1 = require("./Entity");
const OperationItem_1 = require("./OperationItem");
const OperationItemConcept_1 = require("./OperationItemConcept");
const OperationItemDetail_1 = require("./OperationItemDetail");
const Transaction_1 = require("./Transaction");
const operation_1 = require("common/types/operation");
const schemaOptions = Object.assign({}, database_1.defaultSchemaOptions);
schemaOptions.toJSON.getters = true;
const schema = new mongoose_1.Schema({
    datetime: { type: Date, default: Date.now, required: true },
    type: { type: String, enum: operation_1.OperationTypes, default: operation_1.OperationTypes.TRADE, required: true },
    fromEntityId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Entity", alias: "from" },
    toEntityId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Entity", alias: "to" },
    detail: { type: String },
    items: [OperationItem_1.schema],
    // transactions: [new Schema({
    //     transactionId: { type: Schema.Types.ObjectId, ref: 'Transaction' },
    //     amount: { type: Number, min: 0 }, // <= transaction.amount
    // })],
    status: { type: String, enum: operation_1.OperationStatus, default: operation_1.OperationStatus.CREATED },
    totalAmount: { type: Number, default: 0, required: true },
    paidAmount: { type: Number, default: 0, required: true },
    unpaidAmount: { type: Number, default: 0, required: true },
}, schemaOptions);
exports.schema = schema;
schema.virtual('fromEntity', {
    ref: 'Entity', localField: 'fromEntityId', foreignField: '_id', justOne: true,
});
schema.virtual('toEntity', {
    ref: 'Entity', localField: 'toEntityId', foreignField: '_id', justOne: true,
});
schema.virtual('transactions', {
    ref: 'Transaction', localField: '_id', foreignField: 'allocations.operationId',
});
const seeds = [
    {
        datetime: '2022-12-12 12:12:13',
        type: operation_1.OperationTypes.EXCHANGE,
        fromEntity: { taxId: '20337466711' },
        toEntity: { taxId: '20337466711' },
        items: [
            { /*detail: 'Carga SUBE', */ quantity: 1, amount: 1000, conceptId: { type: OperationItemDetail_1.OperationItemDetailType.CONCEPT, entity: { name: 'Carga SUBE' } } }
        ],
        //transactions: [] // Seed Transaction, con array de datos de Operations (que cada una debe encontrar UNA)
        //transactions: [{ transaction: { from: { /*entity*/ }, to: {} }}]
    },
    {
        datetime: '2022-12-12 12:12:12',
        type: operation_1.OperationTypes.EXCHANGE,
        fromEntity: { taxId: '20337466711' },
        //toEntity: { taxId: '20337466711' },
        detail: 'Compra en el Super',
        items: [
            { /*detail: 'Carga SUBE', */ quantity: 10, amount: 250, conceptId: { type: OperationItemDetail_1.OperationItemDetailType.ASSET, entity: { name: 'Atún' } } },
            { detail: 'Promo 10%', quantity: 1, amount: -100, conceptId: { type: OperationItemDetail_1.OperationItemDetailType.CONCEPT, entity: { name: 'Descuento' } } },
        ],
        //transactions: [] // Seed Transaction, con array de datos de Operations (que cada una debe encontrar UNA)
        //transactions: [{ transaction: { from: { /*entity*/ }, to: {} }, amount: 100 }],
    },
    {
        datetime: '2022-12-01 12:12:12',
        type: operation_1.OperationTypes.TRADE,
        fromEntity: { taxId: '30692317714' },
        toEntity: { taxId: '20337466711' },
        detail: 'Salario mensual',
        items: [
            { detail: 'Sueldo neto', quantity: 1, amount: 200000, conceptId: { type: OperationItemDetail_1.OperationItemDetailType.CONCEPT, entity: { name: 'Sueldo Neto' } } },
        ],
    },
    {
        datetime: '2023-01-05 12:12:12',
        type: operation_1.OperationTypes.TRADE,
        fromEntity: { taxId: '20337466711' },
        toEntity: { taxId: '20335035128', name: 'Roti El Sol', company: {} },
        detail: 'Pizza',
        items: [
            { detail: 'Pizza 4 sabores', quantity: 1, amount: 2000, conceptId: { type: OperationItemDetail_1.OperationItemDetailType.ASSET, entity: { name: 'Pizza' } } },
        ],
    },
];
exports.seeds = seeds;
/**
 *
 */
schema.methods.setFromEntity = function (entityData) {
    return __awaiter(this, void 0, void 0, function* () {
        const fromEntity = (entityData instanceof Entity_1.EntityModel)
            ? entityData : yield Entity_1.Entity.findOne(entityData);
        if (!fromEntity) {
            throw new Error(`Entity doesn't exist (${JSON.stringify(entityData)}).`);
        }
        this.fromEntityId = fromEntity.id;
        this.fromEntity = fromEntity;
        return this;
    });
};
/**
 *
 */
schema.methods.setToEntity = function (entityData) {
    return __awaiter(this, void 0, void 0, function* () {
        let toEntity = (entityData instanceof Entity_1.EntityModel)
            ? entityData : yield Entity_1.Entity.findOne(entityData);
        if (!toEntity && Entity_1.Entity.seed) {
            toEntity = (yield Entity_1.EntityModel.seed(entityData));
            //throw new Error(`Entity doesn't exist (${JSON.stringify(entityData)}).`)
        }
        this.toEntityId = toEntity.id;
        return this;
    });
};
/**
 *
 */
schema.methods.addItem = function (itemData) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (!((_a = itemData.conceptId) === null || _a === void 0 ? void 0 : _a.type)) {
            throw new Error(`Need to define type of OperationItem to add to the Operation (${JSON.stringify({ this: this.id, item: itemData.conceptId })}).`);
        }
        let concept; //: OperationItemDetail | null
        switch (itemData.conceptId.type) {
            case OperationItemDetail_1.OperationItemDetailType.ASSET:
                concept = (itemData.conceptId.entity instanceof Asset_1.Asset)
                    ? itemData.conceptId.entity : yield Asset_1.Asset.findOne(itemData.conceptId.entity);
                if (!concept) {
                    concept = yield Asset_1.Asset.create(itemData.conceptId.entity);
                }
                break;
            case OperationItemDetail_1.OperationItemDetailType.CONCEPT:
                concept = (itemData.conceptId.entity instanceof OperationItemConcept_1.OperationItemConcept)
                    ? itemData.conceptId.entity : yield OperationItemConcept_1.OperationItemConcept.findOne(itemData.conceptId.entity);
                if (!concept) {
                    concept = yield OperationItemConcept_1.OperationItemConcept.create(itemData.conceptId.entity);
                }
                break;
        }
        itemData.conceptId.entity = concept._id;
        itemData.total = (itemData.quantity || 0) * (itemData.amount || 0);
        this.items.push(itemData);
        this.totalAmount += itemData.total;
        return this;
    });
};
/**
 *
 */
schema.methods.addTransactionAllocation = function (allocationData) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        // Needs transaction data
        if (!allocationData.transaction) {
            throw new Error(`Need specify the transaction that paid this Operation (${JSON.stringify({ this: this.id, transaction: allocationData.transactionId })}).`);
        }
        // If no amount of transaction specified, it will be for the totalAmount of the Operation
        if (!((_a = allocationData.transaction) === null || _a === void 0 ? void 0 : _a.amount))
            allocationData.transaction.amount = this.totalAmount;
        // Get Transaction. If doesn't exist, create it.
        let transaction = (allocationData.transaction instanceof Transaction_1.Transaction)
            ? allocationData.transaction : yield Transaction_1.Transaction.findOne(allocationData.transaction);
        if (!transaction) {
            transaction = yield Transaction_1.Transaction.create(allocationData.transaction);
        }
        // If no amount to allocate specified, allocates the whole the Transaction unallocatedAmount needed to cancel
        if (!allocationData.amount) {
            allocationData.amount = (this.paidAmount + transaction.unallocatedAmount > this.totalAmount)
                ? this.totalAmount - this.paidAmount // To cancel
                : transaction.unallocatedAmount; // 100%
        }
        allocationData.transactionId = transaction.id;
        this.transactions.push(allocationData);
        this.paidAmount += allocationData.amount;
        return this;
    });
};
schema.statics.seed = function (seeds) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        //const operations: IOperationDocument[] = await this.insertMany(seeds)
        for (const i in seeds) {
            const seed = seeds[i];
            const items = seed.items || [];
            const transactions = seed.transactions || [];
            if (items)
                delete seed.items;
            if (transactions)
                delete seed.transactions;
            const operation = yield this.create(seed);
            // if (!seed.fromEntity)
            //     throw new Error(`Operation's fromEntity is required.`)
            if (seed.fromEntity)
                yield operation.setFromEntity(seed.fromEntity);
            if (seed.toEntity)
                yield operation.setToEntity(seed.toEntity);
            // await Promise.all([
            //     operation.setFromEntity(seed.fromEntity),
            //     operation.setToEntity(seed.toEntity),
            // ])
            operation.paidAmount = seed.paidAmount || 0;
            for (const itemData of items) {
                if (!itemData.currencyCode)
                    itemData.currencyCode = (_a = operation.fromEntity) === null || _a === void 0 ? void 0 : _a.currency;
                yield operation.addItem(itemData);
            }
            operation.unpaidAmount = operation.totalAmount - operation.paidAmount;
            for (const allocationData of transactions)
                yield operation.addTransactionAllocation(allocationData);
            yield operation.save();
        }
    });
};
const Operation = mongoose_1.default.model("Operation", schema);
exports.Operation = Operation;
/*
  +schema.createTradeOperation()
  +schema.createExchangeOperation()

  +model.addItem({})
  +model.removeItem({})
  +model.setItems([{}])

  +model.pay()
  +model.cancel()

  -model.updateState()

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
