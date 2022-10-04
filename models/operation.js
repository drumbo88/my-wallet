import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema({
  date: { type: Date, required: true, default: Date.now },
  type: { type: String, enum: ['Trade', 'Exchange'],  },
  fromEntity: { type: Schema.Types.ObjectId, alias: "from", required: true },
  toEntity: { type: Schema.Types.ObjectId, alias: "to", required: true },
  detail: { type: String },
  items: [{
    item: { type: Schema.Types.ObjectId, ref: 'OperationItem' },
    quantity: { type: Number, required: true, min: 0 },
  }],
  transactions: [{
    transaction: {type: Schema.Types.ObjectId, ref: 'Transaction' },
    amount: { type: Number, required: true, min: 0 }, // <= transaction.amount
  }],
  state: { type: String, enum: ['creation', 'payment', 'completed', 'cancelled'], default: 'pendient' },
});

schema.statics.seed = mongoose.seed

const model = mongoose.model("Operation", schema);

export { model, schema };

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
