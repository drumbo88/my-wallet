import { Entity, OneToOne, Column } from 'typeorm'
import { PaymentCard } from './PaymentCard'
import { AppDataSource as ds } from '../database'

export class PaymentCardPrepaid {

    @OneToOne(type => PaymentCard)
    paymentCard: PaymentCard

    constructor(data: any = {}) {
    }
    static async init(data) {
        const {
            fullname, expirationDate, status, balance,
            ownerPersonEntity, servicePersonEntity, administratorPersonEntity,
            cardDebit, cardCredit, cardPrepaid,
            ...thisData
        } = data
        const obj = new this(thisData)

        obj.paymentCard = await PaymentCard.init({
            fullname, expirationDate, status, balance,
            ownerPersonEntity, servicePersonEntity, administratorPersonEntity,
            cardDebit, cardCredit, cardPrepaid: obj
        })

        return obj
    }
    async save() {
        const repoPaymentCard = ds.getRepository(PaymentCard)
        return await repoPaymentCard.save({
            ...this.paymentCard,
            cardPrepaid: this,
        })
    }

    static async getOne(data) {
        if (data instanceof this) {
            return data
        }
        else {
            const filter = { where: (typeof data == 'string') ? { number: data } : data }
            const personEntity = await ds.getRepository(PaymentCard).findOneOrFail(filter)
            return personEntity.cardPrepaid
        }
    }
}
