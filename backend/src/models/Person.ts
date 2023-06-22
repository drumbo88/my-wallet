import { PersonGenders } from 'common/types/person';
import { DocumentType, modelOptions, prop } from '@typegoose/typegoose';
import { BaseModel } from './BaseModel';
import { myModelOptions } from '../config';

export type DocPerson = DocumentType<Person>;

/*************************************************************************************
 * Clase "Person"
 */
@modelOptions(myModelOptions)
export class Person extends BaseModel {
    @prop({ type: String, required: true })
    firstname: string

    @prop({ type: String, required: true })
    lastname: string

    @prop({ type: Date })
    birthdate: Date

    @prop({ type: PersonGenders })
    gender: PersonGenders
}