import { IUser } from "./user";

export enum EntityStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}
export enum EntityTypes {
    PERSON = 'person',
    COMPANY = 'company'
}
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
export interface IEntity {
    /* Data fields */
    name?: String,
    status: EntityStatus,
    taxId?: String,
    user?: IUser,
    currency?: String,

    person?: IPersonData,
    company?: ICompanyData,

    abstract addOwnedAccount(),
    abstract addAdministratedAccount(),
    abstract getPeople(),
    abstract getCompanies(),
}
export abstract class Entity implements IEntity {
    name?: string,
    status: EntityStatus,
    taxId?: String,
    user?: IUser,
    currency?: string,

    person?: IPersonData,
    company?: ICompanyData,
}
