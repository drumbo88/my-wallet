import mongoose from "mongoose";
import { schema as OperationItem } from "./OperationItem";
import { PersonEntityRefSchema } from "./PersonEntity";
const { Schema } = mongoose;

enum OperationType {
  TRADE = 'TRADE',
  EXCHANGE = 'EXCHANGE',
}
enum OperationStatus {
  CREATED = 'CREATED',
  PAID = 'PAID',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

const schema = new Schema({
  date: { type: Date, default: Date.now, required: true },
  type: { type: String, enum: OperationType, required: true },
  fromEntity: { type: PersonEntityRefSchema, alias: "from", required: true }, //{ type: PersonEntityRef, alias: "from", required: true },
  toEntity: { type: PersonEntityRefSchema, alias: "to", required: true },
  detail: { type: String },
  concepts: [
    //item: { type: OperationItemFields, required: true },
    //quantity: { type: Number, required: true, min: 0 },
    //...OperationItemFields
    OperationItem
  ],
  transactions: [{
    transaction: { type: Schema.Types.ObjectId, ref: 'Transaction' },
    amount: { type: Number, required: true, min: 0 }, // <= transaction.amount
  }],
  state: { type: String, enum: OperationStatus, default: OperationStatus.CREATED },
});

const seeds = []

const Operation = mongoose.model("Operation", schema);

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
