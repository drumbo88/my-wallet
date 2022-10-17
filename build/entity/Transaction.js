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
exports.seeds = exports.Transaction = exports.TransactionSide = void 0;
const typeorm_1 = require("typeorm");
const Account_1 = require("./Account");
const Currency_1 = require("./Currency");
const PaymentCard_1 = require("./PaymentCard");
const PersonEntity_1 = require("./PersonEntity");
const database_1 = require("../database");
class TransactionSide {
    constructor(params) {
        const { personEntity, account, paymentCard, bridgePersonEntity } = params;
        this.personEntity = personEntity;
        this.account = account;
        this.paymentCard = paymentCard;
        this.bridgePersonEntity = bridgePersonEntity;
    }
    // Must be generated from Operation
    static init(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = new this(data);
            const { currency } = data;
            obj.currency = currency ? yield Currency_1.Currency.getOne(currency) : null;
            return obj;
        });
    }
}
__decorate([
    (0, typeorm_1.ManyToOne)(type => Currency_1.Currency, { nullable: true, eager: true }),
    __metadata("design:type", Object)
], TransactionSide.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => PersonEntity_1.PersonEntity, { eager: true }),
    __metadata("design:type", PersonEntity_1.PersonEntity)
], TransactionSide.prototype, "personEntity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => PersonEntity_1.PersonEntity, { eager: true }),
    __metadata("design:type", Account_1.Account // For transfer
    )
], TransactionSide.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => PaymentCard_1.PaymentCard, { eager: true }),
    __metadata("design:type", PaymentCard_1.PaymentCard // For Card (+wallet )
    )
], TransactionSide.prototype, "paymentCard", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => PaymentCard_1.PaymentCard, { eager: true }),
    __metadata("design:type", PaymentCard_1.PaymentCard // Digital wallets
    )
], TransactionSide.prototype, "bridgePersonEntity", void 0);
exports.TransactionSide = TransactionSide;
let Transaction = class Transaction {
    constructor(data = {}) {
        // this.id = ObjectID.createFromTime(new Date().getUTCSeconds())
        const { datetime, amount, exchangeRate, detail, from, to } = data;
        this.datetime = datetime;
        this.amount = amount;
        this.exchangeRate = exchangeRate;
        this.detail = detail;
        this.from = from;
        this.to = to;
    }
    static init(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = new this(data);
            const { from, to } = data;
            obj.from = from ? yield TransactionSide.init(from) : null;
            obj.to = from ? yield TransactionSide.init(from) : null;
            return obj;
        });
    }
    static getOne(data) {
        if (data instanceof this) {
            return data;
        }
        else {
            const filter = { where: (typeof data == 'string') ? { id: data } : data };
            return database_1.AppDataSource.getRepository(this).findOneOrFail(data);
        }
    }
};
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", typeorm_1.ObjectID)
], Transaction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Transaction.prototype, "datetime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Transaction.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], Transaction.prototype, "exchangeRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Transaction.prototype, "detail", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], Transaction.prototype, "from", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], Transaction.prototype, "to", void 0);
Transaction = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Transaction);
exports.Transaction = Transaction;
exports.seeds = [
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
/*
const schema = new Schema({
  datetime: { type: Date, required: true, default: Date.now },
  currency: { type: String, alias: "currencyCode", ref: 'Currency', required: true },
  amount: { type: Number, required: true, min: 0 },
  toCurrency: { type: String, alias: "toCurrencyCode", ref: 'Currency', required: true },
  exchangeRate: { type: Number },

  type: { type: String, enum: ["cash", "deposit", "transfer", "card"], ref: 'Currency', required: true },

  from: { // NULL for cash/deposit
    entityId: { type: Schema.Types.ObjectId, ref: "Entity" },
    // For transfer
    accountId: { type: Schema.Types.ObjectId, ref: "Account" },
    // For Card (+wallet )
    cardId: { type: Schema.Types.ObjectId, ref: "Card" },
    usingEntity: { type: Schema.Types.ObjectId, ref: "Entity" }, // Digital wallets
  },

  to: { // null=cash
    entityId: { type: Schema.Types.ObjectId, ref: "Entity" },
    // For transfer
    accountId: { type: Schema.Types.ObjectId, ref: "Account" },
    // For Card (+wallet )
    cardId: { type: Schema.Types.ObjectId, ref: "Card" },
    usingEntity: { type: Schema.Types.ObjectId, ref: "Entity" }, // Digital wallets
  },
  detail: { type: String },
});
*/
/*schema.statics.seeder = async (data) => {
  const { date, currency, amount, detail } = data;
  let concept = await TransactionConceptModel.findOne(data.concept);

  const me = await PersonModel.findOne({ taxId: "20337466711" }).populate("entity").populate("entity.accounts");
  await me.entity.populate("accounts");

  let fromAccount
  if (data.fromAccount) {
    const { entity: fromEntity } = await CompanyModel.findOne(data.fromAccount.entity).populate("entity")
                                || await PersonModel.findOne(data.fromAccount.entity).populate("entity");
    fromAccount = fromEntity.accounts[0];
  }
  else {
    fromAccount = me.entity.accounts[0];
  }

  if (!concept) {
    await me.populate("entity");
    await me.entity.populate("user");
    data.concept.user = await me.entity.user._id;
    concept = await TransactionConceptModel.create(data.concept);
  }

  // ToDo: Can be Person/Company
  const transactionData = {
    date,
    currency,
    amount,
    detail,
    concept: concept._id,
    fromAccount,
  }
  if (data.toAccount) {
    const { entity: toEntity } = await PersonModel.findOne(data.toAccount.entity).populate("entity");
    const toAccount = toEntity.accounts[0]
    transactionData.toAccount = toAccount._id
  }
  if (data.toCurrency) {
    transactionData.toCurrency = data.toCurrency
  }
  if (data.exchangeRate) {
    transactionData.exchangeRate = data.exchangeRate
  }

  const obj = new model(transactionData);

  await obj.save();
};

schema.statics.seed = mongoose.seed;

const model = mongoose.model("Transaction", schema);

export { model, schema };*/
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
