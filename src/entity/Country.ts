import { Entity, ObjectIdColumn, ObjectID, Column, OneToMany } from 'typeorm'
import { Currency } from './Currency'
import { AppDataSource as ds } from '../database'
import { EntityAbstract } from './EntityInterface'

const repoCurrency = ds.getRepository(Currency)

@Entity()
export class Country extends EntityAbstract {

    @ObjectIdColumn() // ToDo: use symbol column as PK instead?
    id: ObjectID

    @Column({ unique: true })
    code: string

    @Column({ unique: true })
    name: string

    //@OneToMany(type => Currency, (obj) => obj.countries, { eager: true })
    currencies: Currency[]

    constructor(data: any = {}) {
        super()
        // this.id = ObjectID.createFromTime(new Date().getUTCSeconds())
        const { code, name } = data
        this.code = code
        this.name = name
    }

    // ROOT CLASS (to seed)
    static async init(data) {
        const obj = new this(data)
        obj.currencies = []
        if (data.currencies?.length) {
            for (const currencyData of data.currencies) {
                const currency = await Currency.getOne(currencyData)
                obj.currencies.push(currency)
            }
        }
        return obj
    }
    static async initAndSave(data) {
        const { ...thisData } = data
        const obj = await (await this.init(thisData)).save()

        return obj
    }
    async save() {
        const repoCountry = ds.getRepository(this.constructor)
        return await repoCountry.save(this)
    }
    static async getOne(data) {
        if (data instanceof this) {
            return data
        }
        else {
            const filter = { where: (typeof data == 'string') ? { code: data } : data }
            return await ds.getRepository(this).findOneOrFail(filter)
        }
    }

    /*
     * Elements to seed database
     */
    static seeds = [
        { code: 'ARG', name: 'Argentina', currencies: ['ARS'] },
        { code: 'USA', name: 'Estados Unidos', currencies: ['USD'] },
    ]
}
