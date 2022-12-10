import { Entity, OneToOne, Column } from 'typeorm'
import { PersonEntity } from './PersonEntity'
import { AppDataSource as ds } from '../database'
import bcrypt from 'bcryptjs'

enum UserStatus {
    INACTIVE,
    ACTIVE,
    DELETED,
}

export class User {

    @Column({ nullable: true })
    name: string | null

    @Column({ nullable: true })
    emailPrimary: string | null

    @Column({ nullable: true })
    emailSecondary: string | null

    @Column()
    password: string

    @Column({ enum: UserStatus, default: UserStatus.ACTIVE })
    status: UserStatus

    constructor(data: any = {}) {

        const { name, emailPrimary, emailSecondary, password, status } = data

        this.name = name
        this.emailPrimary = emailPrimary
        this.emailSecondary = emailSecondary
        this.password = bcrypt.hashSync(password || "rbx")

        this.status = status || UserStatus.ACTIVE
    }
    static async init(data) {
        const { ...thisData } = data

        const obj = new this(thisData)

        return obj
    }

    static async getOne(data) {
        if (data instanceof this) {
            return data
        }
        else {
            const filter = { where: { user: (typeof data == 'string')
                ? { name: data } : { name: data.name }
            } }
            const personEntity = await ds.getRepository(PersonEntity).findOneOrFail(filter)
            return personEntity.user
        }
    }
}