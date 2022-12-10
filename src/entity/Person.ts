import { IsNull } from 'typeorm'
import { PersonEntity } from './PersonEntity'
import { AppDataSource as ds } from '../database'

enum PersonGenders {
    MALE = 1,
    FEMALE,
    OTHER,
}

export class Person {
    firstName: string | null
    lastName: string | null
    birthdate: Date | null
    gender: PersonGenders

    private personEntity: PersonEntity

    constructor(data: any = {}) {
        const { firstName, lastName, birthdate, gender } = data
        this.firstName = firstName
        this.lastName = lastName
        this.birthdate = birthdate
        this.gender = gender
    }
    static async init(data) {
        const { taxId, user, accountsOwned, accountsAdministrated, ...thisData } = data
        const obj = new this(thisData)

        obj.personEntity = await PersonEntity.init({ taxId, user, accountsOwned, accountsAdministrated })

        return obj
    }
    static async initAndSave(data) {
        const { ...thisData } = data
        const obj = await (await this.init(thisData)).save()

        return obj
    }
    async save() {
        const { personEntity, ...person } = this
        const repoPersonEntity = ds.getRepository(PersonEntity)

        return await repoPersonEntity.save({
            ...personEntity,
            person,
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
            gender: PersonGenders.MALE,
            user: {
              name: "drumbo88",
              emailPrimary: "dario.rumbo@gmail.com",
              password: '12345'
            },
            accountsOwned: [
                { alias: 'drumbo88bf' }
            ]
        }
    ]
}

