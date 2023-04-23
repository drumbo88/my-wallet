import { IEntity } from "./entity"

export enum PersonGenders {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER',
}

export interface IPersonData {
    firstname: String,
    lastname: String,
    birthdate: Date,
    gender: PersonGenders,
}
export interface IPerson extends IEntity {
    person: IPersonData
}
export const PersonFields = {
    firstname: String,
    lastname: String,
    birthdate: Date,
    gender: { type: String, enum: PersonGenders },
}
