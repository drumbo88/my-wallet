import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm'
import { AppDataSource as ds } from '../database'

@Entity()
export class Asset {

    @ObjectIdColumn()
    id: ObjectID

    @Column({ unique: true })
    code: string

    @Column({ unique: true })
    name: string

    constructor(data: any = {}) {
        // this.id = ObjectID.createFromTime(new Date().getUTCSeconds())
        const { code, name } = data
        this.code = code
        this.name = name
    }
    static async init(data) {
        return new this(data)
    }
    async save() {
        const repoAsset = ds.getRepository(this.constructor)
        return await repoAsset.save(this)
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

    /*
     * Elements to seed database
     */
    static seeds = [

    ]

}

