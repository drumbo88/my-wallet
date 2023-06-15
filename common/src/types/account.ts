import { Entity, IEntity } from "./entity"

export enum AccountStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}
export enum AccountTypes {
    FUNDS = 'FUNDS',
    SPOT = 'SPOT',
    EARN = 'EARN',
    FIXED_TERM = 'FIXED_TERM',
    CREDIT = 'CREDIT',
}

// Common props
export class IAccountProps {
    status: AccountStatus
    type: AccountTypes

    adminEntity: String
    ownerEntity: String

    wallets: [ Wallet ]
    paymentCards: [ PaymentCardSchema ]

    // similar methods (diff implementation)

}
// Common methods
export interface IAccountMethods {
    //getByOwner(entityData: IEntity): Promise<Entity>,
}
// Common Class interface
export interface IAccount extends IAccountProps, IAccountMethods {
}

// Common Class
export abstract class Account extends IAccountProps implements IAccountMethods {
    statusStr() {
        switch (this.status) {
            case AccountStatus.ACTIVE:
                return 'Activo'
            case AccountStatus.INACTIVE:
                return 'Inactivo'
        }
    }
    typeStr() {
        switch (this.type) {
            case AccountTypes.FUNDS:
                return 'Fondos'
            case AccountTypes.SPOT:
                return 'Spot'
            case AccountTypes.EARN:
                return 'Earn'
            case AccountTypes.FIXED_TERM:
                return 'Plazo fijo'
            case AccountTypes.CREDIT:
                return 'Crédito'
        }
    }
    static getByNombre(nombre: string): Promise<IAccount | null> {
        throw new Error("Cannot call abstract static method");
    }
    static getByOwner(entityData: IEntity): Promise<IEntity | null> {
        throw new Error("Cannot call abstract static method");
    }
}