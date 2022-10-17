import { Entity, ObjectIdColumn, ObjectID, Column, OneToMany, BaseEntity, Unique, Index } from 'typeorm'
import { Country } from './Country'
import { AppDataSource as ds } from '../database'
import { EntityAbstract } from './EntityInterface'

const repoCountry = ds.getRepository(Country)

enum CurrencyTypes {
    FIAT = 'FIAT',
    CRYPTO = 'CRYPTO',
}

@Entity()
export class Currency extends EntityAbstract {

    @ObjectIdColumn()
    id: ObjectID

    @Unique(["code"])
    @Column({ unique: true })
    code: string

    @Column({ unique: true })
    symbol: string

    @Column({ unique: true })
    name: string

    @Column()
    value: number

    @Column({ nullable: true })
    api: string | null

    @Column()
    type: CurrencyTypes

    @OneToMany(type => Country, (obj) => obj.currencies)
    countries: Country[]

    constructor(data: any = {}) {
        super()
        // this.id = ObjectID.createFromTime(new Date().getUTCSeconds())
        const { code, symbol, name, value, api, type } = data
        this.code = code
        this.symbol = symbol
        this.name = name
        this.value = value
        this.api = api
        this.type = type || CurrencyTypes.FIAT
        //this.countries = []
    }
    // ROOT CLASS (to seed)
    static async init(data: any = {}) {
        const obj = new this(data)
        const { countries } = data
        obj.countries = []
        if (countries?.length) {
            for (const countryData of countries) {
                const country = await repoCountry.findOneOrFail({ where: { code: countryData } })
                obj.countries.push(country)
            }
        }
        return obj
    }

    async save() {
        const repoCurrency = ds.getRepository(this.constructor)
        return await repoCurrency.save(this)
    }
    static getOne(data) {
        if (data instanceof this) {
            return data
        }
        else {
            const filter = { where: (typeof data == 'string') ? { code: data } : data }
            return ds.getRepository(this).findOneOrFail(filter)
        }
    }

    static seeds = [
        { code: 'ARS', symbol: '$', name: 'Peso Argentino', value: 1/150 },
        { code: 'USD', symbol: '$', name: 'Dólar Estadounidense', value: 1 },
        { code: 'BTC', symbol: '₿', name: 'Bitcoin', value: 23000, type: CurrencyTypes.CRYPTO },
    ]
}

