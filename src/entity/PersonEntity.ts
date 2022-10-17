import { Entity, ObjectIdColumn, ObjectID, Column, ManyToOne, OneToMany } from 'typeorm'
import { Person } from './Person'
import { Company } from './Company'
import { Currency } from './Currency'
import bcrypt from 'bcryptjs'
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

    @ManyToOne(type => Currency, { nullable: true, eager: true })
    currency: Currency | null

    @OneToMany(type => Account, obj => obj.ownerPersonEntity, { nullable: true, eager: true })
    @Column({ default: [] })
    accountsOwned: Account[]

    @OneToMany(type => Account, obj => obj.administratorPersonEntity, { nullable: true, eager: true })
    @Column({ default: [] })
    accountsAdministrated: Account[]

    @Column({ enum: PersonEntityStatus, default: PersonEntityStatus.ACTIVE })
    status: PersonEntityStatus

    constructor(data: any = {}) {
        super()
        // this.id = ObjectID.createFromTime(new Date().getUTCSeconds())
        const { taxId, currency, person, company, status } = data
        this.taxId = taxId
        this.currency = currency
        this.person = person
        this.company = company

        this.status = status
    }

    static async init(data) {
        const { accountsOwned, accountsAdministrated, user, ...thisData } = data
        const obj = new this(thisData)
        obj.user = await User.init({ personEntity: this, ...user })
        obj.accountsOwned = []
        obj.accountsAdministrated = []

        if (accountsOwned?.length) {
            for (const accountData of accountsOwned) {
                obj.accountsOwned.push(new Account(accountData))
            }
        }

        if (accountsAdministrated?.length) {
            for (const accountData of accountsAdministrated) {
                obj.accountsAdministrated.push(new Account(accountData))
            }
        }

        return obj
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
