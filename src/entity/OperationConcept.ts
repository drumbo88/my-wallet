import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm'
import { AppDataSource as ds } from '../database'

@Entity()
export class OperationConcept {

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
      const repoOperation = ds.getRepository(this.constructor)
      return await repoOperation.save(this)
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

    ]
}
