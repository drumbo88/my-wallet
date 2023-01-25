import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema({
  datetime: { type: Date, required: true, default: Date.now },
  currency: { type: String, alias: "currencyCode", ref: 'Currency', required: true },
  amount: { type: Number, required: true, min: 0 },
  toCurrency: { type: String, alias: "toCurrencyCode", ref: 'Currency', required: true },
  exchangeRate: { type: Number },

  type: { type: String, enum: ["cash", "deposit", "transfer", "card"], ref: 'Currency', required: true },

  from: { // NULL for cash/deposit
    entity: { type: Schema.Types.ObjectId, ref: "Entity" },
    // For transfer
    accountId: { type: Schema.Types.ObjectId, ref: "Account" },
    // For Card (+wallet )
    card: { type: Schema.Types.ObjectId, ref: "PaymentCard" },
    usingEntity: { type: Schema.Types.ObjectId, ref: "Entity" }, // Digital wallets
  },

  to: { // null=cash
    entity: { type: Schema.Types.ObjectId, ref: "Entity" },
    // For transfer
    accountId: { type: Schema.Types.ObjectId, ref: "Account" },
    // For Card (+wallet )
    card: { type: Schema.Types.ObjectId, ref: "PaymentCard" },
    usingEntity: { type: Schema.Types.ObjectId, ref: "Entity" }, // Digital wallets
  },
  detail: { type: String },
});

const seeds = [
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

schema.statics.seeder = async (data) => {
  /*const { date, currency, amount, detail } = data;
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

  await obj.save();*/
};

//schema.statics.seed = mongoose.seed;

const Transaction = mongoose.model("Transaction", schema);

export { Transaction, schema, seeds };

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
