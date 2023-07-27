import { Entity, EntityModel } from "./Entity";
import { OperationItemTypes } from "common/types/operationItem";
import { IOperation as IOperationSeed, OperationStatus, OperationTypes } from "common/types/operation";
import { DocumentType, getModelForClass, modelOptions, prop, PropType, Ref, ReturnModelType } from "@typegoose/typegoose";
import { myModelOptions } from "../config";
import { BaseModel, DocPartial } from "./BaseModel";
import { OperationItem } from "./OperationItem";
import { AssetModel } from "./Asset";
import { OperationItemConceptModel } from "./OperationItemConcept";

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

    @prop({ type: () => Entity, ref: () => Entity, alias: "from" })
    fromEntity?: Ref<Entity>

    @prop({ type: () => Entity, ref: () => Entity, alias: "to" })
    toEntity?: Ref<Entity>

    @prop({ type: String, trim: true })
    detail: string

    @prop({ type: () => OperationItem, default: [] }, PropType.ARRAY)
    items: OperationItem[]
    // transactions: [new Schema({
    //     transactionId: { type: Schema.Types.ObjectId, ref: () => 'Transaction' },
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
    async setFromEntity(this: DocOperation, entityData: DocPartial<Entity>) {
        this.fromEntity = await EntityModel.getOrCreate(entityData)
        return this
    }

    /**
     *
     */
    async setToEntity(this: DocOperation, entityData: DocPartial<Entity>) {
        this.toEntity = await EntityModel.getOrCreate(entityData)
        return this
    }

    /**
     *
     */
    async addItem(this: DocOperation, itemData: any/* IOperationItem */) {

        if (!itemData.conceptType) {
            throw new Error(`Need to define type of OperationItem to add to the Operation (${JSON.stringify({ this: this.id, item: itemData.concept })}).`)
        }
        let concept //: OperationItemDetail | null
        switch (itemData.conceptType) {
            case OperationItemTypes.ASSET:
                concept = await AssetModel.getOrCreate(itemData.concept)
                break
            case OperationItemTypes.CONCEPT: //case OperationItemTypes.OPERATION:
                concept = await OperationItemConceptModel.getOrCreate(itemData.concept)
                break
            default:
                throw new Error(`Invalid type of OperationItem to add to the Operation (${JSON.stringify({ this: this.id, item: itemData.concept, type: itemData.conceptType })}).`)
        }
        itemData.concept = concept
        itemData.total = (itemData.quantity || 0) * (itemData.amount || 0)
        this.items.push(itemData)
        this.totalAmount += itemData.total
        return this
    }

    /**
     *
     */
    /*async addTransactionAllocation(
        this: DocOperation,
        transaction: DocumentType<Transaction>,
        allocation: TransactionAllocation
    ) {
        // Needs transaction data
        //let transaction = await allocationData.populateAndGet<Transaction>('transaction')
        transaction.findOne({  }).parent()
        if (!transaction) {
            throw new Error(`Need specify the transaction that paid this Operation (${JSON.stringify({ this: this.id, transaction: allocationData.transactionId })}).`)
        }

        // If no amount of transaction specified, it will be for the totalAmount of the Operation
        if (!transaction?.amount)
            transaction.amount = this.totalAmount

        // Get Transaction. If doesn't exist, create it.
        transaction = await TransactionModel.getOrCreate(transaction)

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
    }*/

    static async seed(this: ReturnModelType<typeof Operation>, seeds: /*IOperationSeed*/ any[]) {

        //const operations: IOperationDocument[] = await this.insertMany(seeds)
        for (const i in seeds) {
            const seed = seeds[i]
            const items = seed.items || []
            const transactions = seed.transactions || []
            if (items)
                delete seed.items
            if (transactions)
                delete seed.transactions

            const { fromEntity: fromEntityData, toEntity: toEntityData, ...operationData } = seed

            // Create Operation
            const operation: DocOperation = await this.create(operationData)

            // Set fromEntity
            if (!fromEntityData)
                throw new Error(`Operation's fromEntity is required.`)
            await operation.setFromEntity(fromEntityData)

            // Set toEntity
            if (toEntityData)
                await operation.setToEntity(toEntityData)

            // await Promise.all([
            //     operation.setFromEntity(seed.fromEntity),
            //     operation.setToEntity(seed.toEntity),
            // ])

            // operation.paidAmount = seed.paidAmount || 0
            // await operation.populate('fromEntity')
            // let fromEntity: DocEntity | undefined = isDocument(operation.fromEntity) ? operation.fromEntity : undefined //.toJSON()

            const fromEntity = await operation.populateAndGet<Entity>('fromEntity')

            // Add items
            for (const itemData of items) {
                if (!itemData.currency)
                    itemData.currency = fromEntity?.currency
                await operation.addItem(itemData)
            }
            operation.unpaidAmount = operation.totalAmount - operation.paidAmount

            // TO FIX:
            // for (const allocationData of transactions)
            //     await operation.addTransactionAllocation(allocationData)
            await operation.save()
        }
    }


}

// Genera el modelo a partir de la clase utilizando Typegoose
export const OperationModel = getModelForClass(Operation);


// export interface ITransactionAllocation {
//     transactionId?: Schema.Types.ObjectId,
//     transaction?: ITransaction,
//     amount?: number,
// }

// export interface IOperationBackend extends IOperation {
//     fromEntityId?: Schema.Types.ObjectId,
//     toEntityId?: Schema.Types.ObjectId,
//     /* Virtuals */
//     setFromEntity(entityData: Entity): Promise<IOperationDocument>
//     setToEntity(entityData: Entity): Promise<IOperationDocument>
// }

// export interface IOperationModel extends Model<IOperationBackend> { }
// export interface IOperationDocument extends Document<IOperationModel>, IOperationBackend {
//     // methods
//     addItem(itemData: IOperationItemConcept): Promise<IOperationModel>
//     addTransactionAllocation(allocationData: ITransactionAllocation): Promise<IOperationModel>
// }


export const seeds = [
    {
        datetime: '2022-12-12 12:12:13',
        type: OperationTypes.EXCHANGE,
        fromEntity: { taxId: '20337466711' },
        toEntity: { taxId: '20337466711' },
        items: [
            {
                detail: 'Carga SUBE',
                amount: 1000,
                conceptType: OperationItemTypes.CONCEPT,
                concept: { name: 'Carga SUBE' }
            }
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
            {
                quantity: 10, amount: 250,
                conceptType: OperationItemTypes.ASSET,
                concept: { name: 'Atún' }
            },
            {
                detail: 'Promo 10%',
                amount: -100,
                conceptType: OperationItemTypes.CONCEPT,
                concept: { name: 'Descuento' }
            },
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
            {
                detail: 'Sueldo neto',
                amount: 200000,
                conceptType: OperationItemTypes.CONCEPT,
                concept: { name: 'Sueldo Neto' }
            },
        ],
    },
    {
        datetime: '2023-01-05 12:12:12',
        type: OperationTypes.TRADE,
        fromEntity: { taxId: '20337466711' },
        toEntity: { taxId: '20335035128', name: 'Roti El Sol', company: {} },
        detail: 'Pizza',
        items: [
            {
                detail: 'Pizza 4 sabores',
                amount: 2000,
                conceptType: OperationItemTypes.ASSET,
                concept: { name: 'Pizza' }
            },
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
