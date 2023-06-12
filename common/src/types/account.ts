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

export interface IAccount {
    status: AccountStatus
    type: AccountTypes

    adminEntity: String
    ownerEntity: String

    wallets: [ Wallet ]
    paymentCards: [ PaymentCardSchema ]

    // similar methods (diff implementation)

}

export class Account {
    // shared methods (same implementation)
}
