import { Schema, model, Model, Document } from 'mongoose'
import { IUser, schema as UserSchema } from './User';
import { Account, IAccount } from './Account';
import { seeds as PersonSeeds, IPerson, PersonSchema } from './Person';
import { seeds as CompanySeeds, ICompany, CompanySchema } from './Company';
import { defaultSchemaOptions } from '../database';

export enum EntityStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}
export enum EntityTypes {
  PERSON = 'person',
  COMPANY = 'company'
}

export interface IEntity {
  /* Data fields */
  name?: String,
  status?: EntityStatus,
  taxId?: String,
  user?: IUser,
  currency?: String,
  /* Virtuals */
  // idsAccountsOwned?: Schema.Types.ObjectId[],
  // idsAccountsAdministrated?: Schema.Types.ObjectId[],
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

export interface IEntityModel extends Model<IEntity> {}
export interface IEntityDocument extends Document<IEntityModel>, IEntity {
  // methods
  addOwnedAccount(accountData: IAccount): Promise<IEntityDocument>,
  addAdministratedAccount(accountData: IAccount): Promise<IEntityDocument>,
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
  const adminEntity = (accountData.adminEntity instanceof Entity)
    ? accountData.adminEntity : await Entity.findOne(accountData.adminEntity)
  if (!adminEntity) {
    throw new Error(`Entity doesn't exist (${JSON.stringify(accountData.adminEntity)}).`)
  }
  accountData.adminEntityId = adminEntity.id
  await Account.create(accountData)
  return this
}

EntitySchema.methods.addAdministratedAccount = async function (accountData: IAccount) {
  accountData.adminEntityId = this._id
  const ownedEntity = (accountData.adminEntity instanceof Entity)
    ? accountData.adminEntity : await Entity.findOne(accountData.ownerEntity)
  if (!ownedEntity) {
    throw new Error(`Entity doesn't exist (${JSON.stringify(accountData.ownerEntity)}).`)
  }
  accountData.ownerEntityId = ownedEntity.id
  await Account.create(accountData)
  this.person?.id
  return this
}

EntitySchema.methods.addCreditCard = async function (creditCardData, accountData?: IAccount) {
  if (!accountData) {
    /*if (this.accountsOwned.length != 1) {
      throw new Error(`Must specify Account where the card belongs (${JSON.stringify(creditCardData)}).`)
    }
    if (this.accountsOwned.length != 1) {
      throw new Error(`Must specify Account where the card belongs (${JSON.stringify(creditCardData)}).`)
    }
    if (this.accountsOwned.length) {
      accountData.adminEntityId = this._id
    }*/
  }
  /*const ownedEntity = (accountData.adminEntity instanceof Entity)
    ? accountData.adminEntity : await Entity.findOne(accountData.ownerEntity)
  if (!ownedEntity) {
    throw new Error(`Entity doesn't exist (${JSON.stringify(accountData.ownerEntity)}).`)
  }
  accountData.ownerEntityId = ownedEntity.id
  await Account.create(accountData)
  this.person?.id*/
  return this
}

EntitySchema.statics.seed = async function (seeds: IEntity[]) {
  const entities: IEntityDocument[] = await this.insertMany(seeds)
  for (const i in seeds) {
    const seed = seeds[i]
    const entity = entities[i]
    if (seed.accountsOwned?.length) {
      for (const accData of seed.accountsOwned)
        await entity.addOwnedAccount(accData)
    }
    if (seed.accountsAdministrated?.length) {
      for (const accData of seed.accountsAdministrated)
        await entity.addAdministratedAccount(accData)
    }
    await entity.save()
  }
}

export const Entity = model('Entity', EntitySchema)

