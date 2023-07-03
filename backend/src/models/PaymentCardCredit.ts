import { getDiscriminatorModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { PaymentCardTypes, PeriodType } from 'common/types/paymentCard';
import { myModelOptions, myModelOptionsNoId } from '../config';
import { BaseModel } from './BaseModel';
import { PaymentCard, PaymentCardModel } from './PaymentCard';

@modelOptions(myModelOptionsNoId)
export class PaymentCardPeriod extends BaseModel {
    @prop({ type: String, enum: PeriodType, required: true })
    type: string

    @prop({ type: Number, required: true })
    quantity: number
}

@modelOptions(myModelOptions)
export class PaymentCardCredit extends PaymentCard {
    @prop({ type: PaymentCardPeriod, required: true })
    period: PaymentCardPeriod
}

export const seeds = [
    {
        name: 'DARIO A RUMBO',
        number: '43383100XXXX3840',
        expDate: '0628',

        ownerAccount: {
            ownerEntity: { taxId: '20337466711' },
            adminEntity: { taxId: '30500003193' }
        }, //
        //serviceEntity: { type: Schema.Types.ObjectId, ref: () => 'Entity' }, // (opt.) Visa / Mastercard
        //adminEntity: { taxId: '' }, // DC=Company | CC=Company/null | PPC=Sube/Previaje=>MinTransporte / GiftVoucher=>Company

        balance: 0,
    }
]

//export const model = mongoose.model('PaymentCardCredit', PaymentCardCreditSchema)
export const PaymentCardCreditModel = getDiscriminatorModelForClass(PaymentCardModel, PaymentCardCredit, PaymentCardTypes.CREDIT)
