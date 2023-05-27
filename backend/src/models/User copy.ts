import { IUser, UserFields } from 'common/src/types/user'
import { Schema } from 'mongoose'
import { defaultSchemaOptions } from '../database'

export const schema = new Schema<IUser>(UserFields, defaultSchemaOptions)