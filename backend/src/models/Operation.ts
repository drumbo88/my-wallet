import mongoose, { Document, Model, Schema } from "mongoose";
import { defaultSchemaOptions } from "../database";
import { Entity, DocEntity, EntityModel } from "./Entity";
import { IOperationItem, IOperationItemConcept, schema as OperationItem } from "./OperationItem";
import { OperationItemConcept, OperationItemConceptModel } from "./OperationItemConcept";
import { OperationItemDetailType } from "./OperationItemDetail";
import { DocTransaction, ITransaction, Transaction, TransactionModel } from "./Transaction";
import { IOperation, OperationStatus, OperationTypes } from "common/types/operation";
import { DocumentType, getModelForClass, ModelOptions, modelOptions, prop, Ref, ReturnModelType } from "@typegoose/typegoose";
import { myModelOptions } from "../config";
import { BaseModel } from "./BaseModel";

export type DocOperation = DocumentType<Operation>;

/*************************************************************************************
 * Clase "Operation" para operaciones de compra/venta
 */
@modelOptions(myModelOptions)
export class Operation extends BaseModel {
    @prop({ type: Date, default: Date.now, required: true })
    datetime: Date

    @prop({ type: String, enum: OperationTypes, default: OperationTypes.TRADE, required: true })
    type: string

    @prop({ type: () => Entity, ref: Entity, alias: "from" })
    fromEntity?: Ref<Entity>

    @prop({ type: () => Entity, ref: Entity, alias: "to" })
    toEntity?: Ref<Entity>

    @prop({ type: String })
    detail: string

    @prop({ type: () => [OperationItem] })
    items: OperationItem[]
    // transactions: [new Schema({
    //     transactionId: { type: Schema.Types.ObjectId, ref: 'Transaction' },
    //     amount: { type: Number, min: 0 }, // <= transaction.amount
    // })],
    @prop({ type: String, enum: OperationStatus, default: OperationStatus.CREATED, required: true })
    status: string

    @prop({ type: Number, default: 0, required: true })
    totalAmount: number

    @prop({ type: Number, default: 0, required: true })
    paidAmount: number

    @prop({ type: Number, default: 0, required: true })
    unpaidAmount: number

    /**
     *
     */
    async setFromEntity(this: DocOperation, entityData: Entity) {
        const fromEntity = await EntityModel.getOne(entityData)
        if (!fromEntity) {
            throw new Error(`Entity doesn't exist (${JSON.stringify(entityData)}).`)
        }
        this.fromEntity = fromEntity
        return this
    }

    /**
     *
     */
    async setToEntity(this: DocOperation, entityData: Entity) {
        let toEntity = await EntityModel.getOne(entityData)
        if (!toEntity && Entity.seed) {
            toEntity = await EntityModel.seed(entityData) as DocEntity
            //throw new Error(`Entity doesn't exist (${JSON.stringify(entityData)}).`)
        }
        this.toEntity = toEntity || undefined
        return this
    }

    /**
     *
     */
    async addItem(this: DocOperation, itemData: IOperationItem) {

        if (!itemData.conceptId?.type) {
            throw new Error(`Need to define type of OperationItem to add to the Operation (${JSON.stringify({ this: this.id, item: itemData.conceptId })}).`)
        }
        let concept //: OperationItemDetail | null
        switch (itemData.conceptId.type) {
            case OperationItemDetailType.ASSET:
                concept = OperationModel.getOrCreate(itemData.conceptId.entity)
                break
            case OperationItemDetailType.CONCEPT:
                concept = OperationItemConceptModel.getOrCreate(itemData.conceptId.entity)
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
    async addTransactionAllocation(this: DocOperation, allocationData: ITransactionAllocation) {

        // Needs transaction data
        if (!allocationData.transaction) {
            throw new Error(`Need specify the transaction that paid this Operation (${JSON.stringify({ this: this.id, transaction: allocationData.transactionId })}).`)
        }

        // If no amount of transaction specified, it will be for the totalAmount of the Operation
        if (!allocationData.transaction?.amount)
            allocationData.transaction.amount = this.totalAmount

        // Get Transaction. If doesn't exist, create it.
        let transaction = await TransactionModel.getOrCreate(allocationData.transaction)

        // If no amount to allocate specified, allocates the whole the Transaction unallocatedAmount needed to cancel
        if (!allocationData.amount) {
            allocationData.amount = (this.paidAmount + transaction.unallocatedAmount > this.totalAmount)
                ? this.totalAmount - this.paidAmount // To cancel
                : transaction.unallocatedAmount // 100%
        }
        allocationData.transaction = transaction
        this.transactions.push(allocationData)
        this.paidAmount += allocationData.amount || 0
        return this
    }

    static async seed(this: ReturnModelType<typeof Operation>, seeds: IOperation[]) {

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


}

// Genera el modelo a partir de la clase utilizando Typegoose
export const OperationModel = getModelForClass(Operation);


export interface ITransactionAllocation {
    transactionId?: Schema.Types.ObjectId,
    transaction?: ITransaction,
    amount?: number,
}

export interface IOperationBackend extends IOperation {
    fromEntityId?: Schema.Types.ObjectId,
    toEntityId?: Schema.Types.ObjectId,
    /* Virtuals */
    setFromEntity(entityData: Entity): Promise<IOperationDocument>
    setToEntity(entityData: Entity): Promise<IOperationDocument>
}

export interface IOperationModel extends Model<IOperationBackend> { }
export interface IOperationDocument extends Document<IOperationModel>, IOperationBackend {
    // methods
    addItem(itemData: IOperationItemConcept): Promise<IOperationModel>
    addTransactionAllocation(allocationData: ITransactionAllocation): Promise<IOperationModel>
}


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
            { /*detail: 'Carga SUBE', */quantity: 10, amount: 250, conceptId: { type: OperationItemDetailType.OPERATION, entity: { name: 'Atún' } } },
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
            { detail: 'Pizza 4 sabores', quantity: 1, amount: 2000, conceptId: { type: OperationItemDetailType.OPERATION, entity: { name: 'Pizza' } } },
        ],
    },
]


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
