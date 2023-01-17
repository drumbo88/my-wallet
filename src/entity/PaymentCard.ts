import { Entity, OneToOne, Column, ManyToOne, ObjectID, ObjectIdColumn } from 'typeorm'
import { PersonEntity } from './PersonEntity'
import { PaymentCardDebit } from './PaymentCardDebit'
import { PaymentCardPrepaid } from './PaymentCardPrepaid'
import { PaymentCardCredit } from './PaymentCardCredit'
import { AppDataSource as ds } from '../database'
import { EntityAbstract } from './EntityInterface'

enum PaymentCardStatus {
    INACTIVE,
    ACTIVE,
    EXPIRED,
}
type PaymentCardTypes = PaymentCardDebit | PaymentCardPrepaid | PaymentCardCredit

@Entity()
export class PaymentCard extends EntityAbstract {

    @ObjectIdColumn()
    id: ObjectID

    @Column({ nullable: true })
    number: number | null

    @Column({ nullable: true })
    fullname: string | null

    @Column({ nullable: true })
    expirationDate: Date | null

    @Column({ enum: PaymentCardStatus, default: PaymentCardStatus.ACTIVE })
    status: PaymentCardStatus

    @ManyToOne(type => PersonEntity, { eager: true })
    ownerPersonEntity: PersonEntity

    @ManyToOne(type => PersonEntity, { nullable: true, eager: true })
    servicePersonEntity: PersonEntity | null // (opt.) Visa / Mastercard

    @ManyToOne(type => PersonEntity, { nullable: true, eager: true })
    administratorPersonEntity: PersonEntity | null // DC=Company | CC=Company/null | PPC=Sube/Previaje=>MinTransporte / GiftVoucher=>Company

    @Column({ nullable: true })
    balance: number | null

    @Column({ nullable: true, unique: true })
    cardDebit: PaymentCardDebit | null

    @Column({ nullable: true, unique: true })
    cardPrepaid: PaymentCardPrepaid | null

    @Column({ nullable: true, unique: true })
    cardCredit: PaymentCardCredit | null

    constructor(data: any = {}) {
        super()

        const {
            fullname, expirationDate, status, balance,
            cardDebit, cardCredit, cardPrepaid
        } = data

        this.fullname = fullname
        this.expirationDate = expirationDate
        this.status = status || PaymentCardStatus.ACTIVE
        this.balance = balance

        this.cardDebit = cardDebit
        this.cardCredit = cardCredit
        this.cardPrepaid = cardPrepaid
    }

    static async init(data) {
        const {
            ownerPersonEntity, servicePersonEntity, administratorPersonEntity,
            ...thisData
        } = data

        const obj = new this(thisData)
        if (ownerPersonEntity) {
            obj.ownerPersonEntity = await PersonEntity.getOne(ownerPersonEntity)
        }
        if (servicePersonEntity) {
            obj.servicePersonEntity = await PersonEntity.getOne(servicePersonEntity)
        }
        if (administratorPersonEntity) {
            obj.administratorPersonEntity = await PersonEntity.getOne(administratorPersonEntity)
        }

        return obj
    }

    static getOne(data) {
        if (data instanceof this) {
            return data
        }
        else {
            const filter = { where: (typeof data == 'string') ? { number: data } : data }
            return ds.getRepository(this).findOneOrFail(filter)
        }
    }
}
/*
const schema = new Schema({
    fullname: { type: String },
    number: { type: Number },
    expDate: { type: String },
    userEntity: { type: Schema.Types.ObjectId, ref: 'Entity', required: true }, //
    serviceEntity: { type: Schema.Types.ObjectId, ref: 'Entity' }, // (opt.) Visa / Mastercard
    adminEntity: { type: Schema.Types.ObjectId, ref: 'Entity', required: true }, // DC=Company | CC=Company/null | PPC=Sube/Previaje=>MinTransporte / GiftVoucher=>Company
    balance: { type: Number, required: true },

    limits: {
        payment: {
            day: { type: Number, min: 0 },
            week: { type: Number, min: 0 },
            month: { type: Number, min: 0 },
            all: { type: Number, min: 0 },
        },
        extraction: {
            day: { type: Number, min: 0 },
            week: { type: Number, min: 0 },
            month: { type: Number, min: 0 },
            all: { type: Number, min: 0 },
        },
    },
    // excluyent types: ['PREPAID', 'DEBIT', 'CREDIT'],
    debit: {

    },
    prepaid: {
        fundable: { type: Boolean, required: true }, // can add funds
    },
    credit: {
        period: { type: String, default: '1 month' },
    },
})
*/