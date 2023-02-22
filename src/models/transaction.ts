import mongoose, { Schema, Document, Model } from "mongoose";
import { IDocument } from ".";
import { IOperation, Operation } from "./Operation";
import { Entity, IEntity } from "./Entity";
import { Account, IAccount } from "./Account";
import { IPaymentCard } from "./PaymentCard";
import { defaultSchemaOptions } from "../database";

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
    entity?: IEntity,
    entityId?: Schema.Types.ObjectId,
    account?: IAccount,
    accountOwner?: IEntity,
    accountId?: Schema.Types.ObjectId,
    card?: IPaymentCard,
    cardId?: Schema.Types.ObjectId,
    usingEntiy?: IEntity,
    usingEntiyId?: Schema.Types.ObjectId,
}
export interface ITransaction extends IDocument {
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

    allocateOperation(allocationData: ITransactionAllocation): Promise<ITransaction>
}

const TransactionSide = new Schema({ // NULL for cash/deposit
    entityId: { type: Schema.Types.ObjectId, ref: "Entity" },
    // For transfer
    accountId: { type: Schema.Types.ObjectId, ref: "Account" },
    // For Card (+ digital wallet)
    cardId: { type: Schema.Types.ObjectId, ref: "PaymentCard" },
    usingEntityId: { type: Schema.Types.ObjectId, ref: "Entity" }, // Digital wallets
}, defaultSchemaOptions)

TransactionSide.virtual('account', {
    ref: 'Account', localField: 'accountId', foreignField: '_id', justOne: true
})
TransactionSide.virtual('accountOwner', {
    ref: 'Entity', localField: 'account.ownerEntityId', foreignField: '_id', justOne: true
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
        operationId: { type: Schema.Types.ObjectId, ref: 'Operation' },
        amount: Number,
    }, defaultSchemaOptions)],

    from: TransactionSide,
    to: TransactionSide,

    detail: { type: String },
}, defaultSchemaOptions);

schema.virtual('allocations.operation', {
    ref: 'Operation', localField: 'allocations.operationId', foreignField: '_id', justOne: true
})

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
    let operation
    if (allocationData.operation instanceof Document) {
        operation = allocationData.operation
    }
    else {
        const operations = await Operation.find(allocationData.operation)
        if (operations.length > 1)
            throw new Error(`Only 1 Operation must match to allocate Transaction, found ${operations.length} (${JSON.stringify({ transaction: this.id, operation: allocationData.operation })})`)
        operation = operations.pop()
    }

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
    operation.unpaidAmount = operation.totalAmount - operation.paidAmount
    this.postSave.push(operation)
    //await operation.save() // to afterSave
    allocationData.operationId = operation.id
    allocationData.operation = operation
    this.allocations.push(allocationData)
    this.allocatedAmount += allocationAmount
    this.unallocatedAmount -= allocationAmount
    return this
}

schema.post('validate', doc => {
    if (!doc.postSave)
        doc.postSave = []
})
schema.post('save', async (doc) => {
    await Promise.all(doc.postSave.map(async (doc) => await doc.save()))
    doc.postSave = []
})

const seeds = [
    {
        datetime: '2022-12-12 12:12:12',
        currency: 'ARS',
        amount: 1000,
        toCurrency: 'ARS',
        from: { account: { ownerEntity: { taxId: '20337466711' } } },
        allocations: [{ operation: { datetime: '2022-12-12 12:12:12' }, amount: 1000 }],
    },
    {
        datetime: '2022-12-01 12:12:12',
        currency: 'ARS',
        amount: 200000,
        toCurrency: 'ARS',
        from: { account: { ownerEntity: { taxId: '30692317714' } } },
        to: { account: { ownerEntity: { taxId: '20337466711' } } },
        allocations: [{ operation: { datetime: '2022-12-01 12:12:12' }, amount: 200000 }],
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

schema.statics.seed = async function (seeds: ITransaction[]) {

    //const operations: IOperationDocument[] = await this.insertMany(seeds)
    for (const i in seeds) {
        const seed = seeds[i]
        const allocations = seed.allocations || []
        if (allocations)
            delete seed.allocations
        if (seed.from?.account) {
            const accountData = seed.from.account
            if (accountData.ownerEntity) {
                const ownerEntity = await Entity.findOne(accountData.ownerEntity)
                if (ownerEntity)
                    accountData.ownerEntityId = ownerEntity.id
                delete accountData.ownerEntity
            }
            const fromAccount = await Account.findOne(accountData)
            if (fromAccount)
                seed.from.accountId = fromAccount.id
        }
        if (seed.to?.account) {
            const accountData = seed.to.account
            if (accountData.ownerEntity) {
                const ownerEntity = await Entity.findOne(accountData.ownerEntity)
                if (ownerEntity)
                    accountData.ownerEntityId = ownerEntity.id
                delete accountData.ownerEntity
            }
            const toAccount = await Account.findOne(accountData)
            if (toAccount)
                seed.to.accountId = toAccount.id
        }

        const transaction: ITransactionDocument = await this.create(seed)
        // if (!seed.fromEntity)
        //     throw new Error(`Operation's fromEntity is required.`)

        // await Promise.all([
        //     operation.setFromEntity(seed.fromEntity),
        //     operation.setToEntity(seed.toEntity),
        // ])
        for (const allocationData of allocations) {
            // if (!itemData.currencyCode)
            //     itemData.currencyCode = operation.fromEntity?.currency
            await transaction.allocateOperation(allocationData)
        }
        await transaction.save() // save Operations as well
    }
}

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
};*/

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
