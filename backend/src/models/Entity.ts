import { Schema, model, Model, Document } from 'mongoose'
import { IUser, schema as UserSchema } from './User';
import { Account, IAccount } from './Account';
import { seeds as PersonSeeds, IPerson, PersonSchema, IPersonData } from './Person';
import { seeds as CompanySeeds, ICompany, CompanySchema, ICompanyData } from './Company';
import { defaultSchemaOptions, ISeed, MyModel } from '../database';
import { PaymentCard } from './PaymentCard';

export enum EntityStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}
export enum EntityTypes {
    PERSON = 'person',
    COMPANY = 'company'
}

export interface IAccountSeed extends ISeed {
}
export interface IEntityFields {
    /* Data fields */
    name?: String,
    status?: EntityStatus,
    taxId?: String,
    user?: IUser,
    currency?: String,

    person?: IPersonData,
    company?: ICompanyData,
}
export interface IEntitySeed extends IEntityFields, ISeed {
    /* Data fields */
    name?: String,
    status?: EntityStatus,
    taxId?: String,
    user?: IUser,
    currency?: String,
    /* Virtuals */
    idsAccountsOwned?: Schema.Types.ObjectId[],
    idsAccountsAdministrated?: Schema.Types.ObjectId[],
    accountsOwned?: (IAccount | IAccountSeed | Schema.Types.ObjectId)[],
    accountsAdministrated?: (IAccount | IAccountSeed | Schema.Types.ObjectId)[],
}
export interface IEntity extends IEntityFields {
    idsAccountsOwned?: Schema.Types.ObjectId[],
    idsAccountsAdministrated?: Schema.Types.ObjectId[],
    accountsOwned?: IAccount[],
    accountsAdministrated?: IAccount[],
}

export const seeds = {
    [EntityTypes.COMPANY]: CompanySeeds,
    [EntityTypes.PERSON]: PersonSeeds,
}

export const EntitySchema = new Schema({
    name: { type: String, unique: true, sparse: true },
    status: { type: String, enum: EntityStatus, default: EntityStatus.ACTIVE },
    taxId: { type: String, unique: true, sparse: true },
    user: UserSchema,
    currency: { type: String, alias: "currencyCode", ref: 'Currency' },
    person: PersonSchema,
    company: CompanySchema
}, defaultSchemaOptions)

// export interface IEntityModel extends Model<IEntity> {
//     seed?(seeds: IEntity[] | IEntity): Promise<IEntityDocument>[] | Promise<IEntityDocument>
// }
export interface IEntityDocument extends IEntity, Document {
    addOwnedAccount(accountData: IAccount): Promise<IEntityDocument>,
    addAdministratedAccount(accountData: IAccount): Promise<IEntityDocument>,
    getPeople(data: any): Promise<IEntityDocument[]>
    getCompanies(data: any): Promise<IEntityDocument[]>
}
export interface IEntityModel extends MyModel<IEntityDocument>, EntityModel {}

export class EntityModel extends MyModel<IEntityDocument> {
    static async seed(seeds: IEntitySeed[] | IEntitySeed): Promise<IEntityDocument | IEntityDocument[]> {
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
    }
}
// export interface IEntityDocument extends Document<EntityModel>, IEntity {
//     // statics & methods
//     addOwnedAccount(accountData: IAccount): Promise<IEntityDocument>,
//     addAdministratedAccount(accountData: IAccount): Promise<IEntityDocument>,
// }

/**
 * GET
 */
EntitySchema.statics.getPeople = async function (data: any) {
    // que person esté definido y company sea null
    if (!data.person) data.person = {}
    data.person.$exists = true
    data.person.$ne = null
    if (data.company) delete data.company
    //data.$or = [ { company: { $exists: false } }, { company: { $in: ['', null] } } ]
    return await Entity.find(data)
}
EntitySchema.statics.getCompanies = async function (data: any) {
    // que company esté definido y person sea null
    if (!data.company) data.company = {}
    data.company.$exists = true
    data.company.$ne = null
    if (data.person) delete data.person
    //data.$or = [ { person: { $exists: false } }, { person: { $in: ['', null] } } ]
    return Entity.find(data)
}


EntitySchema.statics.createPerson = async function (data: IPerson) {
}
EntitySchema.statics.createCompany = async function (data: ICompany) {
}
EntitySchema.virtual('accountsOwned', {
    ref: 'Account', localField: '_id', foreignField: 'ownerEntityId',
});
EntitySchema.virtual('accountsAdministrated', {
    ref: 'Account', localField: '_id', foreignField: 'adminEntityId',
});

EntitySchema.methods.addOwnedAccount = async function (accountData: IAccount) {
    accountData.ownerEntityId = this._id
    const adminEntity = (accountData.adminEntity instanceof EntityModel)
        ? accountData.adminEntity : await Entity.findOne(accountData.adminEntity)
    if (!adminEntity) {
        throw new Error(`Entity doesn't exist (${JSON.stringify(accountData.adminEntity)}).`)
    }
    accountData.adminEntityId = adminEntity.id
    await Account.create(accountData)
    //console.log({accountData})
    return this
}

EntitySchema.methods.addAdministratedAccount = async function (accountData: IAccount) {
    accountData.adminEntityId = this._id
    const ownedEntity = (accountData.adminEntity instanceof EntityModel)
        ? accountData.adminEntity : await Entity.findOne(accountData.ownerEntity)
    if (!ownedEntity) {
        throw new Error(`Entity doesn't exist (${JSON.stringify(accountData.ownerEntity)}).`)
    }
    accountData.ownerEntityId = ownedEntity.id
    await Account.create(accountData)
    return this
}

/**
 * @accountData
 *  @value null: unique account / Error
 *  @value IAccount: Account to use
 */
EntitySchema.methods.addCreditCard = async function (creditCardData, accountData?: IAccount) {
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
    const account = (accountData instanceof Account)
        ? accountData : await Account.findOne(accountData)
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
    return this
}

EntitySchema.statics.seed = EntityModel.seed;

export const Entity = model<IEntity, IEntityModel>('Entity', EntitySchema)
