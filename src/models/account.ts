import mongoose, { Schema } from 'mongoose'
import { IPersonEntity } from './PersonEntity'
import { IWallet, schema as Wallet  } from './Wallet'
// import { PersonEntityRefSchema } from './PersonEntity'

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
    adminEntity?: IPersonEntity,
    userEntity?: IPersonEntity,
    status?: AccountStatus,
    type?: AccountTypes,
    wallets: IWallet[]
}

const schema = new Schema<IAccount>({
    status: { type: String, enum: AccountStatus, default: AccountStatus.ACTIVE },
    type: { type: String, enum: AccountTypes, default: AccountTypes.FUNDS },

    // adminEntity: { type: PersonEntityRefSchema, required: true },
    // userEntity: { type: PersonEntityRefSchema, required: true },

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

//const model = mongoose.model('Account', schema)

export { schema }