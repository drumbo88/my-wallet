import { IDbRecord } from ".";

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

export interface IAccount extends IDbRecord {
    status: AccountStatus,
    type: AccountTypes,

    adminEntityId: String,
    ownerEntityId: String,

    // wallets: [ Wallet ],
    // paymentCards: [ PaymentCardSchema ]
}
export interface IAccountStaticMethods {
}
export interface IAccountInstanceMethods {
    // saludar(saludo: string): void;
    //nombreCompleto: string;
}
