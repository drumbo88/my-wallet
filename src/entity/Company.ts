import { Entity, Column, OneToOne, BaseEntity, IsNull, Repository } from 'typeorm'
import { AppDataSource as ds } from '../database'
import { PersonEntity } from './PersonEntity'

enum CompanyTypes {
    COMPANY = 'company',
    E_WALLET = 'e-wallet',
    BANK = 'bank',
    CRYPTO_WALLET = 'crypto-wallet',
    CRYPTO_EXCHANGE = 'crypto-exchange',
}

export class Company {

    // ToRemove: @Column()
    name: string

    // ToRemove: @Column()
    shortName: string

    // ToRemove: @Column({ nullable: true })
    alias: string | null

    // ToRemove: @Column({ enum: CompanyTypes })
    type: CompanyTypes

    // ToRemove: @OneToOne(type => PersonEntity)
    personEntity: PersonEntity

    constructor(data: any = {}) {
        const { name, shortName, alias, type } = data
        this.name = name
        this.shortName = shortName
        this.alias = alias
        this.type = type
    }
    static async init(data: any) {
        const { taxId, user, ...thisData } = data
        const obj = new this(thisData)

        //obj.personEntity = await PersonEntity.getOne({ taxId, user })
        obj.personEntity = await PersonEntity.init({ taxId, user })

        return obj
    }

    /**
     * Saves Company as PersonEntity entity
     */
    async save(): Promise<PersonEntity> {
        const repoPersonEntity = ds.getRepository(PersonEntity)
        return await repoPersonEntity.save({
            ...this.personEntity,
            company: this,
        })
    }

    static async getOne(data) {
        if (data instanceof this) {
            return data
        }
        else {
            const filter = { where: (typeof data == 'string') ? { taxId: data } : data }
            const personEntity = await ds.getRepository(PersonEntity).findOneOrFail(filter)
            return personEntity.company
        }
    }

    /**
     * Counts entities that match given options.
     */
    static async count(filter: any) {
        return PersonEntity.count({ where: { company: !IsNull() } })
    }

    static seeds = [
        {
            name: 'BBVA Francés',
            taxId: '30500003193',
            type: 'Bank',
        },
        {
            name: 'Foncap SA',
            taxId: '30692317714',
            /*accounts: [{
              adminEntity: { taxId: '30500003193' },
            }]*/
        },
        {
            name: 'Binance',
            type: 'CryptoExchange',
        },
    ]
}

