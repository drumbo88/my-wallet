import { DocumentType, modelOptions, prop } from '@typegoose/typegoose';
import { IUser, UserStatus } from 'common/types/user';
import { myModelOptions } from '../config';
import { BaseModel } from './BaseModel';

export type DocUser = DocumentType<User>;

/*************************************************************************************
 * Clase "User"
 */
@modelOptions(myModelOptions)
export class User extends BaseModel implements IUser {
    @prop({ type: String, required: true })
    name: string

    @prop({ type: String, required: true })
    email: string

    @prop({ type: String })
    password: string

    @prop({ type: UserStatus })
    status: UserStatus
}