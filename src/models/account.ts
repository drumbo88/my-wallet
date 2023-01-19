import mongoose, { Schema } from 'mongoose'
import { IEntity } from './Entity'
import { IWallet, schema as Wallet  } from './Wallet'
// import { EntityRefSchema } from './Entity'

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
    adminEntity?: IEntity,
    userEntity?: IEntity,
    status?: AccountStatus,
    type?: AccountTypes,
    wallets: IWallet[]
}

const schema = new Schema<IAccount>({
    status: { type: String, enum: AccountStatus, default: AccountStatus.ACTIVE },
    type: { type: String, enum: AccountTypes, default: AccountTypes.FUNDS },

    // adminEntity: { type: EntityRefSchema, required: true },
    // userEntity: { type: EntityRefSchema, required: true },

    wallets: [ Wallet ]
})
// class x {}
// schema.loadClass(class extends x {})
/* ToDo: Cada Account tendrá varias wallet (bancos) o más de un Asset (criptoBank)
    - funds: { currency, amount, ... }
    - fixedTerm: { currency, amount, ... }

    - funds: [{ currency, amount, ... }, ...]
    - spot: [{ currency, amount, ... }, ...]
    - earn: [{ currency, amount, ... }, ...]
*/

const Account = mongoose.model('Account', schema)

export { schema, Account }