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
    adminEntityId?: Schema.Types.ObjectId,
    ownerEntityId?: Schema.Types.ObjectId,
    adminEntity?: IEntity,
    ownerEntity?: IEntity,
    status?: AccountStatus,
    type?: AccountTypes,
    wallets: IWallet[]
}

const AccountSchema = new Schema<IAccount>({
    status: { type: String, enum: AccountStatus, default: AccountStatus.ACTIVE },
    type: { type: String, enum: AccountTypes, default: AccountTypes.FUNDS },

    adminEntityId: { type: Schema.Types.ObjectId, ref: 'Entity', required: true },
    ownerEntityId: { type: Schema.Types.ObjectId, ref: 'Entity', required: true },

    wallets: [ Wallet ]
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } })

AccountSchema.virtual('ownerEntity', {
    ref: 'Entity', localField: 'ownerEntityId', foreignField: '_id',
});
AccountSchema.virtual('adminEntity', {
    ref: 'Entity', localField: 'adminEntityId', foreignField: '_id',
});

// class x {}
// schema.loadClass(class extends x {})
/* ToDo: Cada Account tendrá varias wallet (bancos) o más de un Asset (criptoBank)
    - funds: { currency, amount, ... }
    - fixedTerm: { currency, amount, ... }

    - funds: [{ currency, amount, ... }, ...]
    - spot: [{ currency, amount, ... }, ...]
    - earn: [{ currency, amount, ... }, ...]
*/

const Account = mongoose.model('Account', AccountSchema)

export { AccountSchema, Account }