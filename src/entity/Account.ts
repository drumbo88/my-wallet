import { Entity, ObjectIdColumn, ObjectID, Column, ManyToOne, BaseEntity } from 'typeorm'
import { Asset } from './Asset'
import { Currency } from './Currency'
import { PersonEntity } from './PersonEntity'
import { AppDataSource as ds } from '../database'

const repoAsset = ds.getRepository(Asset)

enum AccountStatus {
    INACTIVE = 0,
    ACTIVE = 1,
}
enum AccountTypes {
    FUNDS = 1,
    SPOT,
    EARN,
    FIXED_TERM,
    CREDIT,
}

@Entity()
export class Account {

    @ObjectIdColumn()
    id: ObjectID

    @Column({ nullable: true, unique: true })
    address: string | null

    @Column({ nullable: true })
    alias: string | null

    @Column({ default: AccountStatus.ACTIVE })
    status: AccountStatus

    @ManyToOne(type => PersonEntity)
    ownerPersonEntity: PersonEntity

    @ManyToOne(type => PersonEntity)
    administratorPersonEntity: PersonEntity

    @ManyToOne(type => Currency, { nullable: true, eager: true })
    currency: Currency | null

    @Column({ default: AccountTypes.FUNDS })
    type: AccountTypes

    @Column({ nullable: true })
    balance: Number | null

    @Column({ default: [] })
    assets: Asset[]

    @Column({ default: '' })
    detail: string

    constructor(data: any = {}) {
        const { address, currency, alias, assets, type, status, balance, detail } = data
        // this.id = ObjectID.createFromTime(new Date().getUTCSeconds())
        this.address = address
        this.currency = currency
        this.alias = alias
        this.type = type
        this.balance = balance

        if (assets?.length) {
            this.assets = []
            for (const assetData of assets) {
                this.assets.push(new Asset(assetData))
            }
        }

        this.status = status
        this.detail = detail
    }
    static async init(data) {
        const { ownerPersonEntity, administratorPersonEntity, assets, ...thisData } = data
        const obj = new this(thisData)

        obj.ownerPersonEntity = await PersonEntity.getOne(ownerPersonEntity)
        obj.administratorPersonEntity = await PersonEntity.getOne(administratorPersonEntity)

        if (assets?.length) {
            for (const assetData of assets) {
                const asset = await repoAsset.findOneOrFail(assetData)
                obj.assets.push(asset)
            }
        }

        return obj
    }
    async save() {
        const repoAccount = ds.getRepository(this.constructor)
        return await repoAccount.save(this)
    }
  }

/* ToDo: Cada Account tendrá 1 asset (bancos) o más de un Asset (criptoBank)
    - funds: { currency, amount, ... }
    - fixedTerm: { currency, amount, ... }

    - funds: [{ currency, amount, ... }, ...]
    - spot: [{ currency, amount, ... }, ...]
    - earn: [{ currency, amount, ... }, ...]
*/
