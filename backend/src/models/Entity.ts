import { Document } from 'mongoose'
import { User } from './User';
import { AccountModel, Account } from './Account';
import { seeds as PersonSeeds, Person } from './Person';
import { seeds as CompanySeeds, Company, DocCompany } from './Company';
import { PaymentCardModel } from './PaymentCard';
import { DocumentType, getModelForClass, modelOptions, prop, Ref, ReturnModelType } from "@typegoose/typegoose";
import { EntityStatus, EntityTypes } from "common/types/entity";
import { myModelOptions } from '../config';
import { Currency } from './Currency';
import { BaseModel, DocPartial } from './BaseModel';
import { PaymentCardCredit } from './PaymentCardCredit';

export const seeds = {
    [EntityTypes.COMPANY]: CompanySeeds,
    [EntityTypes.PERSON]: PersonSeeds,
}

export type DocEntity = DocumentType<Entity>;

/*************************************************************************************
 * Clase abstracta "Entity" (Employee | Client)
 */
@modelOptions(myModelOptions)
export class Entity extends BaseModel {
    @prop({ type: String, unique: true, required: true })
    name: string

    @prop({ type: EntityStatus, required: true })
    status: EntityStatus

    @prop({ type: String, unique: true, required: true })
    taxId: string

    @prop({ type: () => User, unique: true, required: true })
    user: User

    @prop({ ref: () => Currency, foreignField: 'code', alias: "currencyCode" })
    currency: Ref<Currency>

    @prop({ type: () => Person })
    person?: Person

    @prop({ type: () => Company })
    company?: Company

    @prop({ type: () => [Account], ref: () => Account, required: true, default: [] })
    accountsOwned!: Ref<Account>[]

    @prop({ type: () => [Account], ref: () => Account, required: true, default: [] })
    accountsAdministrated!: Ref<Account>[]

    static async createPerson(this: ReturnModelType<typeof Entity>, data: Partial<Person>): Promise<DocEntity> {
        return await this.create(data)
    }
    static async createCompany(this: ReturnModelType<typeof Entity>, data: DocCompany): Promise<DocEntity> {
        return await this.create(data)
    }

    static async getPeople(this: ReturnModelType<typeof Entity>, data: any) {
        // que person esté definido y company sea null
        if (!data.person) data.person = {}
        data.person.$exists = true
        data.person.$ne = null
        if (data.company) delete data.company
        //data.$or = [ { company: { $exists: false } }, { company: { $in: ['', null] } } ]
        return await EntityModel.find(data)
    }

    static async getCompanies(this: ReturnModelType<typeof Entity>, data: any) {
        // que company esté definido y person sea null
        if (!data.company) data.company = {}
        data.company.$exists = true
        data.company.$ne = null
        if (data.person) delete data.person
        //data.$or = [ { person: { $exists: false } }, { person: { $in: ['', null] } } ]
        return EntityModel.find(data)
    }

    async addOwnedAccount(
        this: DocEntity,
        accountData: DocPartial<Account>
    ): Promise<Document<Entity>> {
        accountData.ownerEntity = this
        const adminEntity = await EntityModel.getOne(accountData.ownerEntity)
        if (!adminEntity) {
            throw new Error(`Entity doesn't exist (${JSON.stringify(accountData.ownerEntity)}).`)
        }
        accountData.adminEntity = adminEntity
        await AccountModel.create(accountData)
        //console.log({accountData})
        return this.toObject()
    }

    async addAdministratedAccount(
        this: DocEntity,
        accountData: DocPartial<Account>
    ): Promise<DocEntity> {
        accountData.adminEntity = this
        const ownerEntity = await EntityModel.getOne(accountData.adminEntity)
        if (!ownerEntity) {
            throw new Error(`Entity doesn't exist (${JSON.stringify(accountData.adminEntity)}).`)
        }
        accountData.ownerEntity = ownerEntity
        await AccountModel.create(accountData)
        return this.toObject()
    }

    /**
     * @accountData
     *  @value null: unique account / Error
     *  @value IAccount: Account to use
     */
    async addCreditCard(
        this: DocEntity,
        creditCardData: DocPartial<PaymentCardCredit>,
        accountData?: DocPartial<Account>
    ): Promise<DocEntity> {
        if (!accountData) {
            switch (this.accountsOwned.length) {
                case 0:
                    throw new Error(`Entity doesn't have an Account to add the card (${JSON.stringify(creditCardData)}).`)
                case 1:
                    accountData = this.accountsOwned[0].id
                default:
                    throw new Error(`Must specify which Account does the card belong (${JSON.stringify(creditCardData)}).`)
            }
        }
        const account = await AccountModel.getOne(accountData)
        //const account = await AccountModel.findById(accountId)
        if (!account) {
            throw new Error(`Account doesn't exist (${JSON.stringify(accountData)}).`)
        }
        await account.populate('ownerEntity')
        if (account.ownerEntity.id != this.id) {
            throw new Error(`The Account to add the card should be owned by the same Entity (${JSON.stringify({ this: this.id, accOwnerId: account.ownerEntity })}).`)
        }

        const creditCard = await PaymentCardModel.getOrCreate(creditCardData)
        await creditCard.populate({ path: 'ownerAccount', model: AccountModel })

        // if (account.id != creditCard.ownerAccount?.id) {
        //     throw new Error(`The Account to add the card should be owned by the same Entity (${JSON.stringify({ this: this.id, accOwnerId: account.ownerEntity })}).`)
        // }

        console.log('Credit card added')

        return this.toObject()
    }

    static async seed(seeds: any[]): Promise<DocEntity | DocEntity[]> {
        const retOne = !Array.isArray(seeds)
        if (retOne)
            seeds = [seeds]
        const entities: DocEntity[] = await EntityModel.insertMany<Entity>(seeds)
        for (const i in seeds) {
            const seed = seeds[i]
            const entity = entities[i]
            if (seed.accountsOwned?.length) {
                //console.log({seed})
                for (const accData of seed.accountsOwned)
                    await entity.addOwnedAccount(accData)
            }
            if (seed.accountsAdministrated?.length) {
                for (const accData of seed.accountsAdministrated)
                    await entity.addAdministratedAccount(accData)
            }
            await entity.save()
        }
        return retOne ? entities.pop() as DocEntity : entities
    }

}

export interface IEntitySeed {
    name, status, taxId, user,
    currency, accountsOwned, accountsAdministrated, addOwnedAccount,
    addAdministratedAccount, addCreditCard
}

// Genera el modelo a partir de la clase utilizando Typegoose
export const EntityModel = getModelForClass(Entity);
