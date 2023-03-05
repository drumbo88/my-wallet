import mongoose, { Document, Model, Schema } from "mongoose";
import { defaultSchemaOptions } from "../database";
import { Asset } from "./Asset";
import { Entity, IEntity, IEntityDocument, EntityModel } from "./Entity";
import { IOperationItem, IOperationItemConcept, schema as OperationItem } from "./OperationItem";
import { OperationItemConcept } from "./OperationItemConcept";
import { IOperationItemDetail, OperationItemDetail, OperationItemDetailType } from "./OperationItemDetail";
import { ITransaction, Transaction } from "./Transaction";

enum OperationTypes {
    TRADE = 'TRADE',
    EXCHANGE = 'EXCHANGE',
}
enum OperationStatus {
    CREATED = 'CREATED',
    PAID = 'PAID',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}

export interface ITransactionAllocation {
    transactionId?: Schema.Types.ObjectId,
    transaction?: ITransaction,
    amount?: number,
}

export interface IOperation {
    /* Data fields */
    datetime: String,
    type?: String,
    fromEntityId?: Schema.Types.ObjectId,
    toEntityId?: Schema.Types.ObjectId,
    detail: String,
    items?: IOperationItem[],
    transactions?: ITransactionAllocation[],
    status?: OperationStatus,

    fromEntity?: IEntity,
    toEntity?: IEntity,

    totalAmount: number,
    paidAmount?: number,
    unpaidAmount?: number,
    /* Virtuals */
    setFromEntity(entityData: IEntity): Promise<IOperationDocument>
    setToEntity(entityData: IEntity): Promise<IOperationDocument>
}
export interface IOperationModel extends Model<IOperation> { }
export interface IOperationDocument extends Document<IOperationModel>, IOperation {
    // methods
    addItem(itemData: IOperationItemConcept): Promise<IOperationModel>
    addTransactionAllocation(allocationData: ITransactionAllocation): Promise<IOperationModel>
}

const schemaOptions = { ...defaultSchemaOptions }
schemaOptions.toJSON.getters = true

const schema = new Schema<IOperation>({
    datetime: { type: Date, default: Date.now, required: true },
    type: { type: String, enum: OperationTypes, default: OperationTypes.TRADE, required: true },
    fromEntityId: { type: Schema.Types.ObjectId, ref: "Entity", alias: "from" }, //{ type: EntityRef, alias: "from", required: true },
    toEntityId: { type: Schema.Types.ObjectId, ref: "Entity", alias: "to" },
    detail: { type: String },
    items: [OperationItem],
    // transactions: [new Schema({
    //     transactionId: { type: Schema.Types.ObjectId, ref: 'Transaction' },
    //     amount: { type: Number, min: 0 }, // <= transaction.amount
    // })],
    status: { type: String, enum: OperationStatus, default: OperationStatus.CREATED },
    totalAmount: { type: Number, default: 0, required: true },
    paidAmount: { type: Number, default: 0, required: true },
    unpaidAmount: { type: Number, default: 0, required: true },
}, schemaOptions);

schema.virtual('fromEntity', {
    ref: 'Entity', localField: 'fromEntityId', foreignField: '_id', justOne: true,
})
schema.virtual('toEntity', {
    ref: 'Entity', localField: 'toEntityId', foreignField: '_id', justOne: true,
})
schema.virtual('transactions', {
    ref: 'Transaction', localField: '_id', foreignField: 'allocations.operationId',
})

const seeds = [
    {
        datetime: '2022-12-12 12:12:13',
        type: OperationTypes.EXCHANGE,
        fromEntity: { taxId: '20337466711' },
        toEntity: { taxId: '20337466711' },
        items: [
            { /*detail: 'Carga SUBE', */quantity: 1, amount: 1000, conceptId: { type: OperationItemDetailType.CONCEPT, entity: { name: 'Carga SUBE' } } }
        ],
        //transactions: [] // Seed Transaction, con array de datos de Operations (que cada una debe encontrar UNA)
        //transactions: [{ transaction: { from: { /*entity*/ }, to: {} }}]
    },
    {
        datetime: '2022-12-12 12:12:12',
        type: OperationTypes.EXCHANGE,
        fromEntity: { taxId: '20337466711' },
        //toEntity: { taxId: '20337466711' },
        detail: 'Compra en el Super',
        items: [
            { /*detail: 'Carga SUBE', */quantity: 10, amount: 250, conceptId: { type: OperationItemDetailType.ASSET, entity: { name: 'Atún' } } },
            { detail: 'Promo 10%', quantity: 1, amount: -100, conceptId: { type: OperationItemDetailType.CONCEPT, entity: { name: 'Descuento' } } },
        ],
        //transactions: [] // Seed Transaction, con array de datos de Operations (que cada una debe encontrar UNA)
        //transactions: [{ transaction: { from: { /*entity*/ }, to: {} }, amount: 100 }],
    },
    {
        datetime: '2022-12-01 12:12:12',
        type: OperationTypes.TRADE,
        fromEntity: { taxId: '30692317714' },
        toEntity: { taxId: '20337466711' },
        detail: 'Salario mensual',
        items: [
            { detail: 'Sueldo neto', quantity: 1, amount: 200000, conceptId: { type: OperationItemDetailType.CONCEPT, entity: { name: 'Sueldo Neto' } } },
        ],
    },
    {
        datetime: '2023-01-05 12:12:12',
        type: OperationTypes.TRADE,
        fromEntity: { taxId: '20337466711' },
        toEntity: { taxId: '20335035128', name: 'Roti El Sol', company: {} },
        detail: 'Pizza',
        items: [
            { detail: 'Pizza 4 sabores', quantity: 1, amount: 2000, conceptId: { type: OperationItemDetailType.ASSET, entity: { name: 'Pizza' } } },
        ],
    },
]

/**
 *
 */
schema.methods.setFromEntity = async function (entityData: IEntity) {
    const fromEntity = (entityData instanceof EntityModel)
        ? entityData : await Entity.findOne(entityData)
    if (!fromEntity) {
        throw new Error(`Entity doesn't exist (${JSON.stringify(entityData)}).`)
    }
    this.fromEntityId = fromEntity.id
    this.fromEntity = fromEntity
    return this
}

/**
 *
 */
schema.methods.setToEntity = async function (entityData: IEntity) {
    let toEntity: IEntityDocument = (entityData instanceof EntityModel)
        ? entityData : await Entity.findOne(entityData)
    if (!toEntity && Entity.seed) {
        toEntity = await EntityModel.seed(entityData) as IEntityDocument
        //throw new Error(`Entity doesn't exist (${JSON.stringify(entityData)}).`)
    }
    this.toEntityId = toEntity.id
    return this
}

/**
 *
 */
schema.methods.addItem = async function (itemData: IOperationItem) {

    if (!itemData.conceptId?.type) {
        throw new Error(`Need to define type of OperationItem to add to the Operation (${JSON.stringify({ this: this.id, item: itemData.conceptId })}).`)
    }
    let concept //: OperationItemDetail | null
    switch (itemData.conceptId.type) {
        case OperationItemDetailType.ASSET:
            concept = (itemData.conceptId.entity instanceof Asset)
                ? itemData.conceptId.entity : await Asset.findOne(itemData.conceptId.entity)
            if (!concept) {
                concept = await Asset.create(itemData.conceptId.entity)
            }
            break
        case OperationItemDetailType.CONCEPT:
            concept = (itemData.conceptId.entity instanceof OperationItemConcept)
                ? itemData.conceptId.entity : await OperationItemConcept.findOne(itemData.conceptId.entity)
            if (!concept) {
                concept = await OperationItemConcept.create(itemData.conceptId.entity)
            }
            break
    }
    itemData.conceptId.entity = concept._id
    itemData.total = (itemData.quantity || 0) * (itemData.amount || 0)
    this.items.push(itemData)
    this.totalAmount += itemData.total
    return this
}

/**
 *
 */
schema.methods.addTransactionAllocation = async function (allocationData: ITransactionAllocation) {

    // Needs transaction data
    if (!allocationData.transaction) {
        throw new Error(`Need specify the transaction that paid this Operation (${JSON.stringify({ this: this.id, transaction: allocationData.transactionId })}).`)
    }

    // If no amount of transaction specified, it will be for the totalAmount of the Operation
    if (!allocationData.transaction?.amount)
        allocationData.transaction.amount = this.totalAmount

    // Get Transaction. If doesn't exist, create it.
    let transaction = (allocationData.transaction instanceof Transaction)
        ? allocationData.transaction : await Transaction.findOne(allocationData.transaction)
    if (!transaction) {
        transaction = await Transaction.create(allocationData.transaction)
    }

    // If no amount to allocate specified, allocates the whole the Transaction unallocatedAmount needed to cancel
    if (!allocationData.amount) {
        allocationData.amount = (this.paidAmount + transaction.unallocatedAmount > this.totalAmount)
            ? this.totalAmount - this.paidAmount // To cancel
            : transaction.unallocatedAmount // 100%
    }
    allocationData.transactionId = transaction.id
    this.transactions.push(allocationData)
    this.paidAmount += allocationData.amount
    return this
}

schema.statics.seed = async function (seeds: IOperation[]) {

    //const operations: IOperationDocument[] = await this.insertMany(seeds)
    for (const i in seeds) {
        const seed = seeds[i]
        const items = seed.items || []
        const transactions = seed.transactions || []
        if (items)
            delete seed.items
        if (transactions)
            delete seed.transactions

        const operation: IOperationDocument = await this.create(seed)

        // if (!seed.fromEntity)
        //     throw new Error(`Operation's fromEntity is required.`)

        if (seed.fromEntity)
            await operation.setFromEntity(seed.fromEntity)
        if (seed.toEntity)
            await operation.setToEntity(seed.toEntity)
        // await Promise.all([
        //     operation.setFromEntity(seed.fromEntity),
        //     operation.setToEntity(seed.toEntity),
        // ])
        operation.paidAmount = seed.paidAmount || 0
        for (const itemData of items) {
            if (!itemData.currencyCode)
                itemData.currencyCode = operation.fromEntity?.currency
            await operation.addItem(itemData)
        }
        operation.unpaidAmount = operation.totalAmount - operation.paidAmount

        for (const allocationData of transactions)
            await operation.addTransactionAllocation(allocationData)

        await operation.save()
    }
}

const Operation: IOperationModel = mongoose.model("Operation", schema);

export { Operation, schema, seeds };

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
