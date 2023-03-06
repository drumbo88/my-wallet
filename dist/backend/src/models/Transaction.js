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
exports.seeds = exports.schema = exports.Transaction = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const Operation_1 = require("./Operation");
const Entity_1 = require("./Entity");
const Account_1 = require("./Account");
const database_1 = require("../database");
var TransactionTypes;
(function (TransactionTypes) {
    TransactionTypes["CASH"] = "CASH";
    TransactionTypes["DEPOSIT"] = "DEPOSIT";
    TransactionTypes["TRANSFER"] = "TRANSFER";
    TransactionTypes["CARD"] = "CARD";
})(TransactionTypes || (TransactionTypes = {}));
const TransactionSide = new mongoose_1.Schema({
    entityId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Entity" },
    // For transfer
    accountId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Account" },
    // For Card (+ digital wallet)
    cardId: { type: mongoose_1.Schema.Types.ObjectId, ref: "PaymentCard" },
    usingEntityId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Entity" }, // Digital wallets
}, database_1.defaultSchemaOptions);
TransactionSide.virtual('account', {
    ref: 'Account', localField: 'accountId', foreignField: '_id', justOne: true
});
TransactionSide.virtual('accountOwner', {
    ref: 'Entity', localField: 'account.ownerEntityId', foreignField: '_id', justOne: true
});
const schema = new mongoose_1.Schema({
    datetime: { type: Date, required: true, default: Date.now },
    currencyCode: { type: String, ref: 'Currency' },
    amount: { type: Number, required: true, min: 0 },
    allocatedAmount: { type: Number, required: true, default: 0, min: 0 },
    unallocatedAmount: { type: Number, required: true, default: function () { const x = this; return (x.amount || 0) - (x.allocatedAmount || 0); }, min: 0 },
    toCurrencyCode: { type: String, ref: 'Currency' },
    exchangeRate: { type: Number },
    type: { type: String, enum: TransactionTypes, default: TransactionTypes.CASH, required: true },
    allocations: [new mongoose_1.Schema({
            operationId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Operation' },
            amount: Number,
        }, database_1.defaultSchemaOptions)],
    from: TransactionSide,
    to: TransactionSide,
    detail: { type: String },
}, database_1.defaultSchemaOptions);
exports.schema = schema;
schema.virtual("currency", {
    ref: "Currency",
    localField: "currencyCode",
    foreignField: "code",
    justOne: true,
});
schema.virtual('allocations.operation', {
    ref: 'Operation', localField: 'allocations.operationId', foreignField: '_id', justOne: true
});
/**
 *
 */
schema.methods.allocateOperation = function (allocationData) {
    return __awaiter(this, void 0, void 0, function* () {
        // Needs transaction data
        if (!allocationData.operation) {
            throw new Error(`Need specify the Operation that allocates this Transaction (${JSON.stringify({ transaction: this.id, operation: allocationData.operation })}).`);
        }
        // If no amount of operation specified, it will look for the Operation with the Transaction's unallocatedAmount
        // if (!allocationData.operation?.totalAmount)
        //   allocationData.operation.totalAmount = this.unallocatedAmount
        // Get Operation. If doesn't exist, throw error.
        let operation;
        if (allocationData.operation instanceof mongoose_1.Document) {
            operation = allocationData.operation;
        }
        else {
            const operations = yield Operation_1.Operation.find(allocationData.operation);
            if (operations.length > 1)
                throw new Error(`Only 1 Operation must match to allocate Transaction, found ${operations.length} (${JSON.stringify({ transaction: this.id, operation: allocationData.operation })})`);
            operation = operations.pop();
        }
        if (!operation) {
            throw new Error(`Operation to allocate Transaction not found (${JSON.stringify({ transaction: this.id, operation: allocationData.operation })})`);
        }
        if (typeof operation.paidAmount == 'undefined') {
            operation.paidAmount = 0;
            operation.unpaidAmount = operation.totalAmount;
        }
        // If no amount to allocate was specified, allocates the whole the Transaction unallocatedAmount needed to cancel
        if (!allocationData.amount) {
            allocationData.amount = (this.unallocatedAmount > operation.totalAmount)
                ? operation.unpaidAmount //this.totalAmount - this.paidAmount // To cancel
                : this.unallocatedAmount; // 100%
        }
        const allocationAmount = allocationData.amount || 0;
        operation.paidAmount += allocationAmount;
        operation.unpaidAmount = operation.totalAmount - operation.paidAmount;
        this.postSave.push(operation);
        //await operation.save() // to afterSave
        allocationData.operationId = operation.id;
        allocationData.operation = operation;
        this.allocations.push(allocationData);
        this.allocatedAmount += allocationAmount;
        this.unallocatedAmount -= allocationAmount;
        return this;
    });
};
schema.post('validate', doc => {
    if (!doc.postSave)
        doc.postSave = [];
});
schema.post('save', (doc) => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all(doc.postSave.map((doc) => __awaiter(void 0, void 0, void 0, function* () { return yield doc.save(); })));
    doc.postSave = [];
}));
const seeds = [
    {
        datetime: '2022-12-12 12:12:12',
        currencyCode: 'ARS',
        amount: 1000,
        toCurrencyCode: 'ARS',
        from: { account: { ownerEntity: { taxId: '20337466711' } } },
        allocations: [{ operation: { datetime: '2022-12-12 12:12:12' }, amount: 1000 }],
    },
    {
        datetime: '2022-12-01 12:12:12',
        currencyCode: 'ARS',
        amount: 200000,
        toCurrencyCode: 'ARS',
        from: { account: { ownerEntity: { taxId: '30692317714' } } },
        to: { account: { ownerEntity: { taxId: '20337466711' } } },
        allocations: [{ operation: { datetime: '2022-12-01 12:12:12' }, amount: 200000 }],
    }
];
exports.seeds = seeds;
/*const seeds = [
  {
    currency: "ARS",
    amount: "1000",
    concept: { name: "Comida" },
    detail: "Brozziano",
  },
  {
    currency: "ARS",
    amount: 400,
    concept: { name: "Sube" }, // CARGAR UNA PREPAGA NO ES UN GASTO. USARLA SI
  },
  {
    currency: "ARS",
    amount: 150000,
    concept: { name: "Sueldo" },
    fromAccount: { entity: { taxId: "30692317714" } },
    toAccount: { entity: { taxId: "20337466711" } },
    detail: "Mes Agosto 2022",
  },
  {
    currency: "ARS",
    amount: 2500,
    concept: { name: "Servicios" },
    detail: "Luz",
  },
  {
    currency: "ARS",
    amount: 150000,
    toCurrency: "BUSD",
    exchangeRate: 280,
    concept: { name: "Conversión" },
    fromAccount: { entity: { taxId: "20337466711" } },
    toAccount: { entity: {
      name: 'Binance',
      type: 'CryptoExchange',
    } },
    detail: "ARS a BUSD",
  },
  {
    currency: "ARS",
    amount: 400,
    concept: { name: "Sube" },
  },
];*/
schema.statics.seed = function (seeds) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        //const operations: IOperationDocument[] = await this.insertMany(seeds)
        for (const i in seeds) {
            const seed = seeds[i];
            const allocations = seed.allocations || [];
            if (allocations)
                delete seed.allocations;
            if ((_a = seed.from) === null || _a === void 0 ? void 0 : _a.account) {
                const accountData = seed.from.account;
                if (accountData.ownerEntity) {
                    const ownerEntity = yield Entity_1.Entity.findOne(accountData.ownerEntity);
                    if (ownerEntity)
                        accountData.ownerEntityId = ownerEntity.id;
                    delete accountData.ownerEntity;
                }
                const fromAccount = yield Account_1.Account.findOne(accountData);
                if (fromAccount)
                    seed.from.accountId = fromAccount.id;
            }
            if ((_b = seed.to) === null || _b === void 0 ? void 0 : _b.account) {
                const accountData = seed.to.account;
                if (accountData.ownerEntity) {
                    const ownerEntity = yield Entity_1.Entity.findOne(accountData.ownerEntity);
                    if (ownerEntity)
                        accountData.ownerEntityId = ownerEntity.id;
                    delete accountData.ownerEntity;
                }
                const toAccount = yield Account_1.Account.findOne(accountData);
                if (toAccount)
                    seed.to.accountId = toAccount.id;
            }
            const transaction = yield this.create(seed);
            // if (!seed.fromEntity)
            //     throw new Error(`Operation's fromEntity is required.`)
            // await Promise.all([
            //     operation.setFromEntity(seed.fromEntity),
            //     operation.setToEntity(seed.toEntity),
            // ])
            for (const allocationData of allocations) {
                // if (!itemData.currencyCode)
                //     itemData.currencyCode = operation.fromEntity?.currency
                yield transaction.allocateOperation(allocationData);
            }
            yield transaction.save(); // save Operations as well
        }
    });
};
const Transaction = mongoose_1.default.model("Transaction", schema);
exports.Transaction = Transaction;
/*
{
  date: '2022-10-10',
  fromAccount: Account,
  toAccount: Account,
  currency: 'USD',
  amount: 2000,
  toCurrency: 'ARS',
  exchangeRate: 280,
  detail: { type: String },
}
*/
