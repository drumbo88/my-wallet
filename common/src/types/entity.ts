import { COMPILE_ERROR_ABSTRACT_STATIC } from "../types";
import { IAccount } from "./account";
import { ICompanyData } from "./company";
import { IPersonData } from "./person";
import { IUser } from "./user";

export enum EntityStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}
export enum EntityTypes {
    PERSON = 'person',
    COMPANY = 'company'
}

// Common props
export class IEntityProps {
    /* Data fields */
    name?: String
    status: EntityStatus
    taxId?: String
    user?: IUser
    currency?: String
    person?: IPersonData
    company?: ICompanyData

    accountsOwned: any[]
    accountsAdministated: any[]

    /* Static methods */
    static getPeople(data: any): Promise<any> {
        throw new Error(COMPILE_ERROR_ABSTRACT_STATIC);
    }
    static getCompanies(data: any): Promise<any> {
        throw new Error(COMPILE_ERROR_ABSTRACT_STATIC);
    }
    //abstract nuevoEmpleado(empleado: IEmpleado): Promise<void>
    //abstract particularImplementation(): void
    static getByName(name: string): Promise<any> {
        throw new Error(COMPILE_ERROR_ABSTRACT_STATIC);
    }
}

// Common methods
export interface IEntityMethods {
    // addOwnedAccount(): Promise<any>
    // addAdministratedAccount(): Promise<any>
    //static getPeople(): Promise<any>
    //static getCompanies(): Promise<any>
}

// Common Class interface
export interface IEntity extends IEntityProps, IEntityMethods {

}

// Common Class
export abstract class Entity extends IEntityProps implements IEntityMethods {
    // abstract addOwnedAccount(): Promise<any>
    // abstract addAdministratedAccount(): Promise<any>
    static getPeople(data: any): Promise<any> {
        throw new Error(COMPILE_ERROR_ABSTRACT_STATIC);
    }
    static getCompanies(data: any): Promise<any> {
        throw new Error(COMPILE_ERROR_ABSTRACT_STATIC);
    }
    //abstract nuevoEmpleado(empleado: IEmpleado): Promise<void>
    //abstract particularImplementation(): void
    static getByName(name: string): Promise<any> {
        throw new Error(COMPILE_ERROR_ABSTRACT_STATIC);
    }
}