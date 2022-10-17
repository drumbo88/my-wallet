import { Entity, OneToOne, Column, IsNull } from 'typeorm'
import { PersonEntity } from './PersonEntity'
import { AppDataSource as ds } from '../database'
import { User } from './User'
import { EntityAbstract } from './EntityInterface'

enum PersonGenders {
    MALE = 1,
    FEMALE,
    OTHER,
}

export class Person {

    // ToRemove: @Column({ nullable: true })
    firstName: string | null

    // ToRemove: @Column({ nullable: true })
    lastName: string | null

    // ToRemove: @Column({ nullable: true })
    birthdate: Date | null

    // ToRemove: @Column({ enum: PersonGenders })
    gender: PersonGenders

    // ToRemove: @OneToOne(type => PersonEntity)
    personEntity: PersonEntity

    constructor(data: any = {}) {
        const { firstName, lastName, birthdate, gender } = data
        this.firstName = firstName
        this.lastName = lastName
        this.birthdate = birthdate
        this.gender = gender
    }
    static async init(data) {
        const {
            taxId, user,
            ...thisData
        } = data
        const obj = new this(thisData)

        obj.personEntity = await PersonEntity.init({ taxId, user })

        return obj
    }
    async save() {
        const repoPersonEntity = ds.getRepository(PersonEntity)
        return await repoPersonEntity.save({
            ...this.personEntity,
            person: this,
        })
    }

    static async getOne(data) {
        if (data instanceof this) {
            return data
        }
        else {
            const filter = { where: (typeof data == 'string') ? { taxId: data } : data }
            const personEntity = await ds.getRepository(PersonEntity).findOneOrFail(filter)
            return personEntity.person
        }
    }

    static async count() {
        return PersonEntity.count({ where: { person: !IsNull() } })
    }

    static seeds = [
        {
            firstName: "Darío",
            lastName: "Rumbo",
            birthdate: "1988-06-19",
            taxId: "20337466711",
            gender: "male",
            user: {
              name: "drumbo88",
              emailPrimary: "dario.rumbo@gmail.com",
              password: '12345'
            },
        }
    ]
}

