import { Schema, model, Model, Document } from 'mongoose'
import { IUser, schema as UserSchema } from './User';
import { Account, IAccount, schema as AccountSchema } from './Account';
import { seeds as PersonSeeds, PersonFields, IPerson, PersonSchema } from './Person';
import { seeds as CompanySeeds, CompanyFields, ICompany, CompanySchema } from './Company';

export enum EntityStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}
export enum EntityTypes {
  PERSON = 'person',
  COMPANY = 'company'
}

export interface IEntity {
  name?: String,
  type?: EntityTypes,
  status?: EntityStatus,
  taxId?: String,
  user?: IUser,
  currency?: String,
  idsAccountsOwned?: Schema.Types.ObjectId[],
  idsAccountsAdministrated?: Schema.Types.ObjectId[],
  accountsOwned?: IAccount[],
  accountsAdministrated?: IAccount[],
  // person?: IPerson,
  // company?: ICompany,
}
export interface IEntityRef {
  entity: Schema.Types.ObjectId,
  type: EntityTypes,
}

export const seeds = {
  [EntityTypes.PERSON]: PersonSeeds,
  [EntityTypes.COMPANY]: CompanySeeds,
}

export const EntitySchema = new Schema({
  name: String,
  status: { type: String, enum: EntityStatus, default: EntityStatus.ACTIVE },
  taxId: { type: String, unique: true, sparse: true },
  user: UserSchema,
  currency: { type: String, alias: "currencyCode", ref: 'Currency' },
  idsAccountsOwned: [{ type: Schema.Types.ObjectId, ref: 'Account' }],
  idsAccountsAdministrated: [{ type: Schema.Types.ObjectId, ref: 'Account' }],
  person: PersonSchema,
  company: CompanySchema
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } })

export interface IEntityModel extends Model<IEntity> {}
export interface IEntityDocument extends Document<IEntityModel>, IEntity {
  addAccount(accountData: IAccount): IEntityDocument,
}

EntitySchema.statics.createPerson = async function (data: IPerson) {
}
EntitySchema.statics.createCompany = async function (data: ICompany) {
}
EntitySchema.virtual('accountsOwned', {
  ref: 'Account', localField: 'idsAccountsOwned', foreignField: '_id',
});
EntitySchema.virtual('accountsAdministrated', {
  ref: 'Account', localField: 'idsAccountsAdministrated', foreignField: '_id',
});
EntitySchema.methods.addAccount = async function (accountData: IAccount) {
  const account = await Account.create(accountData)
  if (!this.idsAccountsOwned.includes(account._id))
    this.idsAccountsOwned.push(account._id)
  return this
}
EntitySchema.statics.seed = async function (seeds: IEntity[]) {
  const people: IEntityDocument[] = await this.insertMany(seeds)
  for (const i in seeds) {
    const seed = seeds[i]
    const person = people[i]
    if (seed.accountsOwned?.length) {
      for (const accData of seed.accountsOwned)
        await person.addAccount(accData)
      await person.save()
      console.log(await person.populate('accountsOwned'))
      person.accountsOwned
    }
  }
}

export const Entity = model('Entity', EntitySchema)
// export const EntityRefSchema = new Schema<IEntityRef>({
//   entity: { type: Schema.Types.ObjectId, refPath: 'type', required: true },
//   type: { type: String, enum: EntityTypes, required: true },
// })

