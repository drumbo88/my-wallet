import mongoose, { Schema } from 'mongoose'
import { IPaymentCard } from './PaymentCard';

enum PeriodType {
    DAY = 'DAY',
    MONTH = 'MONTH',
}

export interface IPaymentCardCreditData {
  period: {
    type: {
        quantity: { type: Number, required: true },
        type: { type: String, enum: PeriodType, required: true },
    }
  },
}
export interface IPaymentCardCredit extends IPaymentCard {
  credit: IPaymentCardCreditData
}
export const PaymentCardCreditSchema = new Schema({
  period: new mongoose.Schema({
      quantity: { type: Number, required: true },
      type: { type: String, enum: PeriodType, required: true },
  }),
})
export const seeds = [
  {
    name: 'DARIO A RUMBO',
    number: '43383100XXXX3840',
    expDate: '0628',

    ownerAccount: { ownerEntity: { taxId: '20337466711' }, adminEntity: { taxId: '30500003193' } }, //
    //serviceEntity: { type: Schema.Types.ObjectId, ref: 'Entity' }, // (opt.) Visa / Mastercard
    //adminEntity: { taxId: '' }, // DC=Company | CC=Company/null | PPC=Sube/Previaje=>MinTransporte / GiftVoucher=>Company

    balance: 0,
  }
]

//export const model = mongoose.model('PaymentCardCredit', PaymentCardCreditSchema)
