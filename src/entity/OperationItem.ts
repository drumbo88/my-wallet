import { Entity, ObjectIdColumn, ObjectID, Column, ManyToOne } from 'typeorm'
import { Asset } from './Asset'
import { Currency } from './Currency'
import { OperationConcept } from './OperationConcept'

@Entity()
export class OperationItem {

    @ObjectIdColumn()
    id: ObjectID

    @ManyToOne(type => Currency, { nullable: true, eager: true })
    currency: Currency | null

    @Column()
    quantity: number

    @Column()
    price: number

    @ManyToOne(type => Asset, { nullable: true, eager: true })
    asset: Asset | null

    @ManyToOne(type => OperationConcept, { nullable: true, eager: true })
    concept: OperationConcept | null

    @Column({ default: '' })
    detail: string

    constructor(data: any = {}) {
        // this.id = ObjectID.createFromTime(new Date().getUTCSeconds())
        const { currency, quantity, price, asset, concept, detail } = data
        this.currency = currency
        this.quantity = quantity
        this.price = price
        this.detail = detail

        this.asset = asset || null
        this.concept = concept || null
    }
    static async init(data) {
      const { asset, concept, currency, ...thisData } = data
      const obj = new this(thisData)

      obj.currency = await Currency.getOne(currency)
      obj.asset = asset ? await Asset.getOne(asset) : null
      obj.concept = concept ? await OperationConcept.getOne(concept) : null

      return obj
    }

}

export const seeds = [

]
