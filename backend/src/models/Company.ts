import { CompanyTypes } from 'common/src/types/company'
import { PersonGenders } from 'common/types/person';
import { DocumentType, modelOptions, prop } from '@typegoose/typegoose';
import { BaseModel } from './BaseModel';

//export type DocPerson = DocumentType<Person>;

/*************************************************************************************
 * Clase "Company"
 */
export class Company extends BaseModel {
    @prop({ type: String, required: true })
    firstname: string

    @prop({ type: String, required: true })
    lastname: string

    @prop({ type: Date })
    birthdate: Date

    @prop({ type: String, enum: CompanyTypes, default: CompanyTypes.COMPANY })
    type: String
}
