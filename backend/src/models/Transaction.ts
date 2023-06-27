import { Document } from "mongoose";
import { Operation } from "./Operation";
import { Entity as Entity, EntityModel } from "./Entity";
import { Account as Account, AccountModel } from "./Account";
import { PaymentCard } from "./PaymentCard";
import { DocumentType, getModelForClass, modelOptions, post, prop, Ref, ReturnModelType } from "@typegoose/typegoose";
import { myModelOptions } from "../config";
import { BaseModel, DocPartial } from "./BaseModel";
import { Currency } from "./Currency";
import { TransactionTypes } from "common/types/transaction";



/*************************************************************************************
 * Clase "TransactionSide" para especificar origen o destino de una transacción
 */
@modelOptions(myModelOptions)
export class TransactionSide extends BaseModel {
    @prop({ type: () => Entity, ref: Entity, required: true })
    entity: Ref<Entity>

    // For transfer
    @prop({ type: () => Account, ref: Account })
    account: Ref<Account>

    // For Card (+ digital wallet)
    @prop({ type: () => PaymentCard, ref: PaymentCard })
    card: Ref<PaymentCard>

    // Digital wallets
    @prop({ type: () => Entity, ref: Entity })
    usingEntity: Ref<Entity>
}


/*************************************************************************************
 * Clase "TransactionAllocation" para imputación de monto de transacción a una operación
 */
@modelOptions(myModelOptions)
export class TransactionAllocation extends BaseModel {
    @prop({ type: () => Operation, ref: Operation })
    operation!: Ref<Operation>

    @prop({ type: Number, default: 0, required: true })
    amount!: number
}
// Genera el modelo a partir de la clase utilizando Typegoose
export const TransactionAllocationModel = getModelForClass(TransactionAllocation);


export type DocTransaction = DocumentType<Transaction>;

/*************************************************************************************
 * Clase "Transaction" para movimientos de dinero
 */
@modelOptions(myModelOptions)
@post<Transaction>('validate', function (doc) {
    if (!doc.postSave) {
        doc.postSave = []
    }
})
@post<Transaction>('save', async function () {
    await Promise.all(this.postSave.map(async () => await this.save()))
    this.postSave = []
})
export class Transaction extends BaseModel {
    @prop({ type: Date, default: Date.now, required: true })
    datetime: Date

    @prop({ ref: Currency, foreignField: 'code', alias: "currencyCode", required: true })
    currency: Ref<Currency>

    @prop({ ref: Currency, foreignField: 'code', alias: "toCurrencyCode", required: true })
    toCurrency: Ref<Currency>

    @prop({ type: Number, default: 0, required: true })
    amount!: number

    @prop({ type: () => [TransactionAllocation], default: [], required: true })
    allocations!: TransactionAllocation[]

    @prop({ type: Number, default: 0, required: true })
    allocatedAmount!: number

    @prop({ type: Number, default: 0, required: true })
    unallocatedAmount!: number

    @prop({ type: Number, default: 0, required: true })
    exchangeRate?: number

    @prop({ enum: TransactionTypes, required: true })
    type: TransactionTypes

    @prop({ type: () => TransactionSide })
    from?: TransactionSide

    @prop({ type: () => TransactionSide })
    to?: TransactionSide

    @prop({ type: String })
    detail?: string

    postSave: Operation[]

    /**
     *  @allocationData
     */
    async allocateOperation(this: DocTransaction, allocationData: DocPartial<TransactionAllocation>): Promise<typeof this> {

        // Get allocation document or generate it
        const allocation = (allocationData instanceof Document)
            ? allocationData : new TransactionAllocationModel(allocationData)

        // Needs Operation data
        const operation = await allocation.populateAndGet<Operation>('operation')
        if (!allocation.operation || !operation) {
            throw new Error(`Operation to allocate Transaction not found (${JSON.stringify({ transaction: this.id, operation: allocation.operation })}).`)
        }

        // First allocation to that Operation
        if (typeof operation.paidAmount == 'undefined') {
            operation.paidAmount = 0
            operation.unpaidAmount = operation.totalAmount
        }

        // If no amount to allocate was specified, allocates the whole the Transaction unallocatedAmount needed to cancel the Operation unpaid amount
        if (!allocation.amount) {
            allocation.amount = (this.unallocatedAmount > operation.totalAmount)
                ? operation.unpaidAmount //this.totalAmount - this.paidAmount // To cancel
                : this.unallocatedAmount // 100%
        }
        const allocationAmount = allocation.amount

        // Update operation amounts
        operation.paidAmount += allocationAmount
        operation.unpaidAmount = operation.totalAmount - operation.paidAmount
        this.postSave.push(operation)
        //await operation.save()
        allocation.operation = operation
        this.allocations.push(allocation)
        this.allocatedAmount += allocationAmount
        this.unallocatedAmount -= allocationAmount
        return this
    }

    static async seed(this: ReturnModelType<typeof Transaction>, seeds: ITransactionSeed[] | ITransactionSeed) {
        //const operations: IOperationDocument[] = await this.insertMany(seeds)
        for (const i in seeds) {
            const seed = seeds[i]
            const allocations = seed.allocations || []
            if (allocations)
                delete seed.allocations
            if (seed.from?.account) {
                const accountData = seed.from.account
                if (accountData.ownerEntity) {
                    const ownerEntity = await EntityModel.findOne(accountData.ownerEntity)
                    if (ownerEntity)
                        accountData.ownerEntityId = ownerEntity.id
                    delete accountData.ownerEntity
                }
                const fromAccount = await AccountModel.findOne(accountData)
                if (fromAccount)
                    seed.from.accountId = fromAccount.id
            }
            if (seed.to?.account) {
                const accountData = seed.to.account
                if (accountData.ownerEntity) {
                    const ownerEntity = await EntityModel.findOne(accountData.ownerEntity)
                    if (ownerEntity)
                        accountData.ownerEntityId = ownerEntity.id
                    delete accountData.ownerEntity
                }
                const toAccount = await AccountModel.findOne(accountData)
                if (toAccount)
                    seed.to.accountId = toAccount.id
            }

            const transaction/*: DocTransaction*/ = await this.create(seed)
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
}

// Genera el modelo a partir de la clase utilizando Typegoose
export const TransactionModel = getModelForClass(Transaction);

export const seeds = [
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
]

interface ITransactionSeed {

}
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
// export interface ITransactionModel extends Model<ITransaction> { }
// export interface ITransactionDocument extends Document<ITransactionModel>, ITransaction {
    // methods
    // addOwnedAccount(accountData: IAccount): Promise<ITransactionDocument>,
    // addAdministratedAccount(accountData: IAccount): Promise<ITransactionDocument>,
// }


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
