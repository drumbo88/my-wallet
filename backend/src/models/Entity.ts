import { Schema, model, Model, Document } from 'mongoose'
import { schema as UserSchema } from './User';
import { AccountModel, AccountBackend, IAccount } from './Account';
import { seeds as PersonSeeds, IPerson } from './Person';
import { seeds as CompanySeeds, ICompany } from './Company';
import { defaultSchemaOptions } from '../database';
import { PaymentCard } from './PaymentCard';
import { ISeed } from 'src/types';

export const seeds = {
    [EntityTypes.COMPANY]: CompanySeeds,
    [EntityTypes.PERSON]: PersonSeeds,
}


import { DocumentType, getModelForClass, modelOptions, prop, Ref, ReturnModelType } from "@typegoose/typegoose";
import { IEntity, EntityStatus, EntityTypes, Entity } from "common/types/entity";
import { myModelOptions } from 'src/config';
import { IUser } from 'common/src/types/user';

/*************************************************************************************
 * Clase abstracta "Entity" (Employee | Client)
 */
@modelOptions(myModelOptions)
export class EntityBackend extends Entity implements IEntity {
    @prop({ type: String, unique: true, required: true })
    name: string

    @prop({ type: EntityStatus, required: true })
    status: EntityStatus

    @prop({ type: String, unique: true, required: true })
    taxId: string

    @prop({ type: String, unique: true, required: true })
    user: IUser

    @prop({ type: String, alias: "currencyCode", ref: 'Currency' })
    currency: string

    @prop({ type: IPerson })
    person: IPerson

    @prop({ type: ICompany })
    company: ICompany

    @prop({ type: () => [AccountBackend], ref: AccountBackend, required: true, default: [] })
    accountsOwned: Ref<AccountBackend>[]

    @prop({ type: () => [AccountBackend], ref: AccountBackend, required: true, default: [] })
    accountsAdministrated: Ref<AccountBackend>[]

    static async createPerson(this: ReturnModelType<typeof EntityBackend>, data: IPerson) {
        await this.create(data)
    }
    static async createCompany(this: ReturnModelType<typeof EntityBackend>, data: ICompany) {
        await this.create(data)
    }

    static async getPeople(data: any) {
        // que person esté definido y company sea null
        if (!data.person) data.person = {}
        data.person.$exists = true
        data.person.$ne = null
        if (data.company) delete data.company
        //data.$or = [ { company: { $exists: false } }, { company: { $in: ['', null] } } ]
        return await EntityModel.find(data)
    }
    static async getCompanies(data: any) {
        // que company esté definido y person sea null
        if (!data.company) data.company = {}
        data.company.$exists = true
        data.company.$ne = null
        if (data.person) delete data.person
        //data.$or = [ { person: { $exists: false } }, { person: { $in: ['', null] } } ]
        return EntityModel.find(data)
    }

    async addOwnedAccount(
        this: DocumentType<EntityBackend>,
        accountData: IAccount
    ): Promise<Document<EntityBackend>> {
        accountData.ownerEntityId = this.id
        const adminEntity = (accountData.adminEntity instanceof Document<EntityBackend>)
            ? accountData.adminEntity : await EntityModel.findOne(accountData.adminEntity)
        if (!adminEntity) {
            throw new Error(`Entity doesn't exist (${JSON.stringify(accountData.adminEntity)}).`)
        }
        accountData.adminEntityId = adminEntity.id
        await AccountModel.create(accountData)
        //console.log({accountData})
        //const document: Document<EntityBackend> = this.toObject();
        return this.toObject()
    }
    async addAdministratedAccount(this: DocumentType<EntityBackend>, accountData: IAccount) {
        accountData.adminEntityId = this._id
        const ownedEntity = (accountData.adminEntity instanceof Document<EntityBackend>)
            ? accountData.adminEntity : await EntityModel.findOne(accountData.ownerEntity)
        if (!ownedEntity) {
            throw new Error(`Entity doesn't exist (${JSON.stringify(accountData.ownerEntity)}).`)
        }
        accountData.ownerEntityId = ownedEntity.id
        await AccountModel.create(accountData)
        return this.toObject()
    }

    /**
     * @accountData
     *  @value null: unique account / Error
     *  @value IAccount: Account to use
     */
    async addCreditCard(
        this: DocumentType<EntityBackend>,
        creditCardData,
        accountData?: IAccount
    ): Promise<Document<EntityBackend>> {
        if (!accountData) {
            switch (this.accountsOwned.length) {
                case 0:
                    throw new Error(`Entity doesn't have an Account to add the card (${JSON.stringify(creditCardData)}).`)
                case 1:
                    accountData = this.accountsOwned[0]
                default:
                    throw new Error(`Must specify which Account does the card belong (${JSON.stringify(creditCardData)}).`)
            }
        }
        const account = (accountData instanceof AccountModel)
            ? accountData : await AccountModel.findOne(accountData)
        if (!account) {
            throw new Error(`Entity doesn't exist (${JSON.stringify(accountData.ownerEntity)}).`)
        }
        if (account.ownerEntityId != this.id) {
            throw new Error(`The Account to add the card should be owned by the same Entity (${JSON.stringify({ this: this.id, accOwnerId: account.ownerEntityId })}).`)
        }
        if (account.ownerEntityId != creditCardData.ownerEntityId) {
            throw new Error(`The Account to add the card should be owned by the same Entity (${JSON.stringify({ this: this.id, accOwnerId: account.ownerEntityId })}).`)
        }
        creditCardData = creditCardData
        await PaymentCard.create(accountData)
        console.log('Account created')
        return this.toObject()
    }

    /*static async seed(seeds: IEntitySeed[] | IEntitySeed): Promise<IEntityDocument | IEntityDocument[]> {
        const retOne = !Array.isArray(seeds)
        if (retOne)
            seeds = [seeds as IEntitySeed]
        const entities: IEntityDocument[] = await Entity.insertMany(seeds)
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
        return retOne ? entities.pop() as IEntityDocument : entities
    }*/

}

// Genera el modelo a partir de la clase utilizando Typegoose
export const EntityModel = getModelForClass(EntityBackend);


/* BACKEND */
export interface IAccountSeed extends ISeed {
}
export interface IEntitySeed extends IEntity, ISeed {
    /* Virtuals */
    // idsAccountsOwned?: Schema.Types.ObjectId[],
    // idsAccountsAdministrated?: Schema.Types.ObjectId[],
    // accountsOwned?: (IAccount | IAccountSeed | Schema.Types.ObjectId)[],
    // accountsAdministrated?: (IAccount | IAccountSeed | Schema.Types.ObjectId)[],
}
/*export interface IEntity extends Entity {
    idsAccountsOwned?: Schema.Types.ObjectId[],
    idsAccountsAdministrated?: Schema.Types.ObjectId[],
    accountsOwned?: IAccount[],
    accountsAdministrated?: IAccount[],
}*/
