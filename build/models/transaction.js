"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.model = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const schema = new Schema({
    datetime: { type: Date, required: true, default: Date.now },
    currency: { type: String, alias: "currencyCode", ref: 'Currency', required: true },
    amount: { type: Number, required: true, min: 0 },
    toCurrency: { type: String, alias: "toCurrencyCode", ref: 'Currency', required: true },
    exchangeRate: { type: Number },
    type: { type: String, enum: ["cash", "deposit", "transfer", "card"], ref: 'Currency', required: true },
    from: {
        entityId: { type: Schema.Types.ObjectId, ref: "Entity" },
        // For transfer
        accountId: { type: Schema.Types.ObjectId, ref: "Account" },
        // For Card (+wallet )
        cardId: { type: Schema.Types.ObjectId, ref: "Card" },
        usingEntity: { type: Schema.Types.ObjectId, ref: "Entity" }, // Digital wallets
    },
    to: {
        entityId: { type: Schema.Types.ObjectId, ref: "Entity" },
        // For transfer
        accountId: { type: Schema.Types.ObjectId, ref: "Account" },
        // For Card (+wallet )
        cardId: { type: Schema.Types.ObjectId, ref: "Card" },
        usingEntity: { type: Schema.Types.ObjectId, ref: "Entity" }, // Digital wallets
    },
    detail: { type: String },
});
exports.schema = schema;
schema.statics.seeds = () => [
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
];
schema.statics.seeder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, currency, amount, detail } = data;
    let concept = yield TransactionConceptModel.findOne(data.concept);
    const me = yield PersonModel.findOne({ taxId: "20337466711" }).populate("entity").populate("entity.accounts");
    yield me.entity.populate("accounts");
    let fromAccount;
    if (data.fromAccount) {
        const { entity: fromEntity } = (yield CompanyModel.findOne(data.fromAccount.entity).populate("entity"))
            || (yield PersonModel.findOne(data.fromAccount.entity).populate("entity"));
        fromAccount = fromEntity.accounts[0];
    }
    else {
        fromAccount = me.entity.accounts[0];
    }
    if (!concept) {
        yield me.populate("entity");
        yield me.entity.populate("user");
        data.concept.user = yield me.entity.user._id;
        concept = yield TransactionConceptModel.create(data.concept);
    }
    // ToDo: Can be Person/Company
    const transactionData = {
        date,
        currency,
        amount,
        detail,
        concept: concept._id,
        fromAccount,
    };
    if (data.toAccount) {
        const { entity: toEntity } = yield PersonModel.findOne(data.toAccount.entity).populate("entity");
        const toAccount = toEntity.accounts[0];
        transactionData.toAccount = toAccount._id;
    }
    if (data.toCurrency) {
        transactionData.toCurrency = data.toCurrency;
    }
    if (data.exchangeRate) {
        transactionData.exchangeRate = data.exchangeRate;
    }
    const obj = new model(transactionData);
    yield obj.save();
});
schema.statics.seed = mongoose_1.default.seed;
const model = mongoose_1.default.model("Transaction", schema);
exports.model = model;
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
