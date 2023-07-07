import { DocumentType, modelOptions, prop } from '@typegoose/typegoose';
import { IUser, UserStatus } from 'common/types/user';
import { myModelOptions, myModelOptionsNoId } from '../config';
import { BaseModel } from './BaseModel';

export type DocUser = DocumentType<User>;

/*************************************************************************************
 * Clase "User"
 */
@modelOptions(myModelOptionsNoId)
export class User extends BaseModel
{
    @prop({ type: String, required: true })
    name: string

    @prop({ type: String })
    email: string

    @prop({ type: String })
    password: string

    @prop({ type: String, enum: UserStatus })
    status: string
}