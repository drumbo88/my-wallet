import { Entity, ManyToOne, Column, ObjectID, ObjectIdColumn } from 'typeorm'
import { OperationItem } from './OperationItem'
import { PersonEntity } from './PersonEntity'
import { Transaction } from './Transaction'
import { AppDataSource as ds } from '../database'

const repoOperationItem = ds.getRepository(OperationItem)
const repoTransaction = ds.getRepository(Transaction)

enum OperationTypes {
  TRADE = 1,
  EXCHANGE,
}
enum OperationStatus {
  CREATED = 1,
  PAID,
  COMPLETED,
  CANCELLED
}

/**********************************************************
 * ManyToMany Class.
 */
export class ObjectItemAssignation {

  @ManyToOne(type => OperationItem, { eager: true })
  item: OperationItem

  @Column()
  quantity: number

  constructor(data: any = {}) {
    this.quantity = data.quantity
  }

  static async init(data): Promise<ObjectItemAssignation> {
    const { item, ...thisData } = data
    const obj = new this(thisData)

    if (!(item instanceof OperationItem))
      data.item = await OperationItem.init(data.item)
    obj.item = data.item

    return obj
  }
}

/**********************************************************
 * ManyToMany Class.
 */
export class TransactionAssignation {

  @ManyToOne(type => Transaction, { eager: true })
  transaction: Transaction

  @Column()
  amount: number

  constructor(data: any = {}) {
    this.amount = data.amount
  }

  static async init(data): Promise<TransactionAssignation> {
    const { transaction, ...thisData } = data
    const obj = new this(thisData)

    if (!(transaction instanceof OperationItem))
      data.transaction = await OperationItem.init(transaction)
    obj.transaction = data.transaction

    return obj
  }
}

/*/**********************************************************
 * Buy/Sell operation. It generates debts that demands payments (transactions) to be paid off.
 * Items/concepts are compose the operation.
 */
@Entity()
export class Operation {

    @ObjectIdColumn()
    id: ObjectID

    @Column()
    datetime: Date

    @Column({ enum: OperationTypes })
    type: OperationTypes

    @ManyToOne(() => PersonEntity, { eager: true })
    fromPersonEntity: PersonEntity

    @ManyToOne(() => PersonEntity, { eager: true })
    toPersonEntity: PersonEntity

    @Column({ default: '' })
    detail: string

    @Column({ default: [] })
    items: ObjectItemAssignation[]

    @Column({ default: [] })
    transactions: TransactionAssignation[]

    @Column({ enum: OperationStatus, default: OperationStatus.CREATED })
    status: OperationStatus

    constructor(data: any = {}) {
      const { datetime, type, detail, status } = data

      this.datetime = datetime
      this.type = type
      this.detail = detail

      this.status = status || OperationStatus.CREATED
  }

  /*
   * Create instance of this class
   */
  static async init(data): Promise<Operation> {
      const { fromPersonEntity, toPersonEntity, items, transactions, ...thisData } = data
      const obj = new this(thisData)
      obj.items = []
      obj.transactions = []

      obj.fromPersonEntity = await PersonEntity.getOne(fromPersonEntity)
      obj.toPersonEntity = await PersonEntity.getOne(toPersonEntity)

      if (items?.length) {
          for (const itemAsigData of items) {
              const { quantity, ...itemData } = itemAsigData
              const item = await repoOperationItem.findOneOrFail(itemData)
              obj.items.push(new ObjectItemAssignation({ item, quantity }))
          }
      }

      if (transactions?.length) {
          for (const transactionAsigData of transactions) {
              const { amount, ...transactionData } = transactionAsigData
              const transaction = await repoTransaction.findOneOrFail(transactionData)
              obj.transactions.push(new TransactionAssignation({ transaction, amount }))
          }
      }
      return obj
  }

  /*
   * Save instance in database
   */
  async save(): Promise<Operation> {
    const repoOperation = ds.getRepository(this.constructor)

    for (const i of this.items) {
      if (!(Number(i.item.asset) ^ Number(i.item.concept)))
        throw new Error("Need to define concept or asset for OperationItem")
    }

    return await repoOperation.save(this)
  }

  /*
   * Get one instance from database
   */
  static getOne(data): Promise<Operation> | Operation {
      if (data instanceof this) {
          return data
      }
      else {
          const filter = { where: (typeof data == 'string') ? { id: data } : data }
          return ds.getRepository(this).findOneOrFail(filter)
      }
  }

  /*
   * Elements to seed database
   */
  static seeds = [
    {
      datetime: '2022-10-10',
      type: OperationTypes.TRADE, // 1 o más transacciones unidireccionales (salvo devolución) (Compra: envio pago (->) | Venta: recibo pago (<-))
      fromPersonEntity: { taxId: '20337466711' },
      toPersonEntity: { taxId: '20337466711' },
      amount: 5000, currency: 'ARS',
      detail: 'Compra de bien o servicio',
      items: [
        { item: { }, quantity: 10, price: 500 },
      ],
      transactions: [
        { datetime: null, fromAccount: { alias: 'drumbo88bf' }, toAccount: { address: 'CBU123123123123' }, currency: null, amount: 5000 }
      ],
    },
  ]
};

/*
  +class.createTradeOperation()
  +class.createExchangeOperation()

  +object.addItem({})
  +object.removeItem({})
  +object.setItems([{}])

  +object.pay()
  +object.cancel()

  -object.updateStatus()

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
