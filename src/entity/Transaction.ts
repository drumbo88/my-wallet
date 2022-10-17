import { Entity, Column, ManyToOne, ObjectID, ObjectIdColumn } from 'typeorm'
import { Account } from './Account'
import { Currency } from './Currency'
import { PaymentCard } from './PaymentCard'
import { PersonEntity } from './PersonEntity'
import { AppDataSource as ds } from '../database'

export class TransactionSide {

  @ManyToOne(type => Currency, { nullable: true, eager: true })
  currency: Currency | null

  @ManyToOne(type => PersonEntity, { eager: true })
  personEntity: PersonEntity

  @ManyToOne(type => PersonEntity, { eager: true })
  account: Account // For transfer

  @ManyToOne(type => PaymentCard, { eager: true })
  paymentCard: PaymentCard // For Card (+wallet )

  @ManyToOne(type => PaymentCard, { eager: true })
  bridgePersonEntity: PaymentCard // Digital wallets

  constructor(params) {

    const { personEntity, account, paymentCard, bridgePersonEntity } = params

    this.personEntity = personEntity
    this.account = account
    this.paymentCard = paymentCard
    this.bridgePersonEntity = bridgePersonEntity
  }

  // Must be generated from Operation
  static async init(data) {
    const obj = new this(data)
    const { currency } = data

    obj.currency = currency ? await Currency.getOne(currency) : null

    return obj
  }

}

@Entity()
export class Transaction {

  @ObjectIdColumn()
  id: ObjectID

  @Column()
  datetime: Date

  @Column()
  amount: number

  @Column({ nullable: true })
  exchangeRate: number | null

  @Column({ default: '' })
  detail: string

  @Column({ nullable: true })
  from: TransactionSide | null

  @Column({ nullable: true })
  to: TransactionSide | null

  constructor(data: any = {}) {

    // this.id = ObjectID.createFromTime(new Date().getUTCSeconds())
    const { datetime, amount, exchangeRate, detail, from, to } = data

    this.datetime = datetime
    this.amount = amount
    this.exchangeRate = exchangeRate
    this.detail = detail

    this.from = from
    this.to = to
  }
  static async init(data) {
    const obj = new this(data)
    const { from, to } = data

    obj.from = from ? await TransactionSide.init(from) : null
    obj.to = from ? await TransactionSide.init(from) : null

    return obj
  }

  static getOne(data) {
    if (data instanceof this) {
        return data
    }
    else {
        const filter = { where: (typeof data == 'string') ? { id: data } : data }
        return ds.getRepository(this).findOneOrFail(data)
    }
  }

}

export const seeds = [
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
