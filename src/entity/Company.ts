import { Entity, Column, OneToOne, BaseEntity, IsNull, Repository, ObjectID } from 'typeorm'
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

    name: string
    shortName: string
    alias: string | null
    type: CompanyTypes

    private personEntity: PersonEntity

    constructor(data: any = {}) {
        const { name, shortName, alias, type } = data
        this.name = name
        this.shortName = shortName
        this.alias = alias
        this.type = type
    }
    static async init(data: any) {
        const { taxId, user, accountsOwned, accountsAdministrated, personEntityId, ...thisData } = data
        const obj = new this(thisData)

        obj.personEntity = personEntityId
            ? await PersonEntity.getOne(personEntityId)
            : await PersonEntity.init({ taxId, user, accountsOwned, accountsAdministrated })

        return obj
    }

    static async initAndSave(data) {
        const { accountsOwned, accountsAdministrated, ...thisData } = data
        const obj = await (await this.init(thisData)).save()

        return obj
    }
    /**
     * Saves Company as PersonEntity entity
     */
    async save(): Promise<PersonEntity> {
        const { personEntity, ...company } = this
        const repoPersonEntity = ds.getRepository(PersonEntity)
        return await repoPersonEntity.save({
            ...personEntity,
            company,
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

