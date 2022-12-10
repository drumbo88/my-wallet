import { Entity, ObjectIdColumn, ObjectID, Column, ManyToOne, OneToMany } from 'typeorm'
import { Person } from './Person'
import { Company } from './Company'
import { Currency } from './Currency'
import { Account } from './Account'
import { User } from './User'
import { AppDataSource as ds } from '../database'
import { EntityAbstract } from './EntityInterface'

enum PersonEntityStatus {
    INACTIVE = 0,
    ACTIVE = 1,
}
type PersonEntityTypes = Person | Company

@Entity()
export class PersonEntity extends EntityAbstract {

    @ObjectIdColumn()
    id: ObjectID

    @Column({ nullable: true, unique: true })
    taxId: string | null

    @Column({ nullable: true, unique: true })
    person: Person | null

    @Column({ nullable: true, unique: true })
    company: Company | null

    @Column({ nullable: true, unique: true })
    user: User | null

    @ManyToOne(() => Currency, { nullable: true, eager: true })
    currency: Currency | null

    @OneToMany(() => Account, obj => null, { nullable: true, eager: true })
    @Column({ default: [] })
    accountsOwned: (Account | ObjectID)[]

    @OneToMany(() => Account, obj => null, { nullable: true, eager: true })
    @Column({ default: [] })
    accountsAdministrated: (Account | ObjectID)[]

    @Column({ enum: PersonEntityStatus, default: PersonEntityStatus.ACTIVE })
    status: PersonEntityStatus

    constructor(data: any = {}) {
        super()

        const { taxId, currency, person, company, status } = data
        this.taxId = taxId
        this.currency = currency
        this.person = person
        this.company = company

        this.status = status || PersonEntityStatus.ACTIVE
    }

    static async init(data) {
        const { accountsOwned, accountsAdministrated, user, ...thisData } = data

        const obj = new this(thisData)
        if (user) {
            obj.user = await User.init(user)
        }
        obj.accountsOwned = []
        obj.accountsAdministrated = []

        if (accountsOwned?.length) {
            await obj.addAccountOwned(accountsOwned)
            //obj.accountsOwned.push(await Account.init(accountData))
        }

        if (accountsAdministrated?.length) {
            await obj.addAccountAdministrated(accountsAdministrated)
            //obj.accountsAdministrated.push(await Account.init(accountData))
        }

        return obj
    }

    async addAccountOwned(data) {
        for (const accountOwnedData of data) {
            const account = await (await Account.init({ ownerPersonEntity: this, ...accountOwnedData })).save()
            this.accountsOwned.push(account.id)
        }
    }
    async addAccountAdministrated(data) {
        for (const accountAdministratedData of data) {
            const account = await Account.init({ administratorPersonEntity: this, ...accountAdministratedData })
            this.accountsAdministrated.push(account.id)
        }
    }

    static getOne(data) {
        if (data instanceof this) {
            return data
        }
        else {
            const filter = { where: (typeof data == 'string') ? { id: data } : data }
            return ds.getRepository(this).findOneOrFail(filter)
        }
    }
}
