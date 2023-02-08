import mongoose, { Schema, Document, Model } from "mongoose";
import { IOperation, IOperationDocument, IOperationModel, Operation } from "./Operation";

enum TransactionTypes {
    CASH = 'CASH',
    DEPOSIT = 'DEPOSIT',
    TRANSFER = 'TRANSFER',
    CARD = 'CARD',
}

export interface ITransactionAllocation {
    operationId?: Schema.Types.ObjectId,
    operation?: IOperation,
    amount?: number,
}
export interface ITransactionSide {
    entity?: String,
    accountId?: String,
    card?: String,
    usingEntiy?: String,
}
export interface ITransaction {
    datetime?: Date
    currency?: String
    toCurrency?: String
    amount?: number
    allocations?: ITransactionAllocation[]
    allocatedAmount?: number
    unallocatedAmount?: number
    exchangeRate?: number
    type: TransactionTypes
    from?: ITransactionSide
    to?: ITransactionSide
    detail?: String
}

const TransactionSide = new Schema({ // NULL for cash/deposit
    entity: { type: Schema.Types.ObjectId, ref: "Entity" },
    // For transfer
    accountId: { type: Schema.Types.ObjectId, ref: "Account" },
    // For Card (+ digital wallet)
    card: { type: Schema.Types.ObjectId, ref: "PaymentCard" },
    usingEntity: { type: Schema.Types.ObjectId, ref: "Entity" }, // Digital wallets
})

const schema = new Schema<ITransaction>({
    datetime: { type: Date, required: true, default: Date.now },
    currency: { type: String, alias: "currencyCode", ref: 'Currency' },
    amount: { type: Number, required: true, min: 0 },
    allocatedAmount: { type: Number, required: true, default: 0, min: 0 },
    unallocatedAmount: { type: Number, required: true, default: function () { const x = this as ITransaction; return (x.amount || 0) - (x.allocatedAmount || 0) }, min: 0 },
    toCurrency: { type: String, alias: "toCurrencyCode", ref: 'Currency' },
    exchangeRate: { type: Number },

    type: { type: String, enum: TransactionTypes, default: TransactionTypes.CASH, required: true },
    allocations: [new Schema({
        operation: { type: Schema.Types.ObjectId, ref: 'Operation' },
        amount: Number,
    })],

    from: { type: TransactionSide },
    to: { type: TransactionSide },

    detail: { type: String },
});

/**
 *
 */
schema.methods.allocateOperation = async function (allocationData: ITransactionAllocation) {

    // Needs transaction data
    if (!allocationData.operation) {
        throw new Error(`Need specify the Operation that allocates this Transaction (${JSON.stringify({ transaction: this.id, operation: allocationData.operation })}).`)
    }

    // If no amount of operation specified, it will look for the Operation with the Transaction's unallocatedAmount
    // if (!allocationData.operation?.totalAmount)
    //   allocationData.operation.totalAmount = this.unallocatedAmount

    // Get Operation. If doesn't exist, throw error.
    let operation = (allocationData.operation instanceof Document)
        ? allocationData.operation : await Operation.findOne(allocationData.operation) // Look for many, require to adjust filter to get just one
    if (!operation) {
        throw new Error(`Operation to allocate Transaction not found (${JSON.stringify({ transaction: this.id, operation: allocationData.operation })})`)
    }
    if (typeof operation.paidAmount == 'undefined') {
        operation.paidAmount = 0
        operation.unpaidAmount = operation.totalAmount
    }

    // If no amount to allocate was specified, allocates the whole the Transaction unallocatedAmount needed to cancel
    if (!allocationData.amount) {
        allocationData.amount = (this.unallocatedAmount > operation.totalAmount)
            ? operation.unpaidAmount //this.totalAmount - this.paidAmount // To cancel
            : this.unallocatedAmount // 100%
    }
    const allocationAmount = allocationData.amount || 0
    operation.paidAmount += allocationAmount
    allocationData.operationId = operation.id
    this.allocations.push(allocationData)
    this.allocatedAmount += allocationAmount
    this.unallocatedAmount -= allocationAmount
    return this
}

const seeds = [
    {
        datetime: '2022-12-12 12:12:12',
        currency: 'ARS',
        amount: 1000,
        toCurrency: 'ARS',
        from: { entity: { taxId: '20337466711' } },
        allocations: [{ operation: true/*{ datetime: '2022-12-12 12:12:12' }*/, amount: 1000 }],
    }
]
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
export interface ITransactionModel extends Model<ITransaction> { }
export interface ITransactionDocument extends Document<ITransactionModel>, ITransaction {
    // methods
    // addOwnedAccount(accountData: IAccount): Promise<ITransactionDocument>,
    // addAdministratedAccount(accountData: IAccount): Promise<ITransactionDocument>,
}

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
