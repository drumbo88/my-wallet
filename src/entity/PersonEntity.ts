import { Schema } from 'mongoose'
import { IUser, schema as UserSchema } from './User';
import { IAccount, schema as AccountSchema } from './Account';

export enum PersonEntityStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}
export enum PersonEntityType {
  PERSON = 'PERSON',
  COMPANY = 'COMPANY'
}

export interface IPersonEntity {
  name?: String,
  status?: PersonEntityStatus,
  taxId?: String,
  user?: IUser,
  currency?: String,
  accountsOwned?: IAccount[],
  accountsAdministrated?: IAccount[],
}
export interface IPersonEntityRef {
  entity: Schema.Types.ObjectId,
  type: PersonEntityType,
}

export const PersonEntitySchema = new Schema({
  name: String,
  status: { type: String, enum: PersonEntityStatus, default: PersonEntityStatus.ACTIVE },
  taxId: { type: String, unique: true, sparse: true },
  user: UserSchema,
  currency: { type: String, alias: "currencyCode", ref: 'Currency' },
  accountsOwned: [ AccountSchema ],
  accountsAdministrated: [ AccountSchema ],
})

export const PersonEntityRefSchema = new Schema<IPersonEntityRef>({
  entity: { type: Schema.Types.ObjectId, refPath: 'type', required: true },
  type: { type: String, enum: PersonEntityType, required: true },
})

