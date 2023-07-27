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
    @prop({ type: String, required: true, trim: true })
    name: string

    @prop({ type: String, trim: true })
    email: string

    @prop({ type: String, trim: true })
    password: string

    @prop({ type: String, enum: UserStatus })
    status: string
}