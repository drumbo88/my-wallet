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

    @OneToOne(type => PersonEntity)
    personEntity: PersonEntity

    constructor(data: any = {}) {

        const { name, emailPrimary, emailSecondary, password, status } = data

        this.name = name
        this.emailPrimary = emailPrimary
        this.emailSecondary = emailSecondary
        this.password = bcrypt.hashSync(password || "rbx")

        this.status = status || UserStatus.ACTIVE
    }
    static async init(data) {
        const { personEntity, ...thisData } = data
        const obj = new this(thisData)

        obj.personEntity = personEntity //await PersonEntity.init(personEntity)

        return obj
    }

    static async getOne(data) {
        if (data instanceof this) {
            return data
        }
        else {
            const personEntity = await ds.getRepository(PersonEntity).findOneOrFail(data)
            return personEntity.user
        }
    }
}