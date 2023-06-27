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
    /*status: AccountStatus
    type: AccountTypes

    adminEntity: String
    ownerEntity: String

    wallets: [ Wallet ]
    paymentCards: [ PaymentCardSchema ]

    // similar methods (diff implementation)*/

}
// Common methods
export interface IAccountMethods {
    //getByOwner(entityData: IEntity): Promise<Entity>,
}
// Common Class interface
export interface IAccount extends IAccountProps, IAccountMethods {
}
