import mongoose, { Document, Model, Schema } from 'mongoose'
import { defaultSchemaOptions } from '../database'
import { Entity, IEntity, EntityModel } from './Entity'
import { IPaymentCard, PaymentCardSchema } from './PaymentCard'
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
    wallets?: IWallet[]
    paymentCards?: IPaymentCard[]
}
export interface IAccountModel extends Model<IAccount> { }
export interface IAccountDocument extends Document<IAccountModel>, IAccount {
    // methods
    getByOwner(itemData: IAccount): Promise<IAccountModel>
}

const AccountSchema = new Schema<IAccount>({
    status: { type: String, enum: AccountStatus, default: AccountStatus.ACTIVE },
    type: { type: String, enum: AccountTypes, default: AccountTypes.FUNDS },

    adminEntityId: { type: Schema.Types.ObjectId, ref: 'Entity', required: true },
    ownerEntityId: { type: Schema.Types.ObjectId, ref: 'Entity', required: true },

    wallets: [ Wallet ],
    paymentCards: [ PaymentCardSchema ]
}, defaultSchemaOptions)

AccountSchema.virtual('ownerEntity', {
    ref: 'Entity', localField: 'ownerEntityId', foreignField: '_id', justOne: true,
})
AccountSchema.virtual('adminEntity', {
    ref: 'Entity', localField: 'adminEntityId', foreignField: '_id', justOne: true,
})

AccountSchema.statics.getByOwner = async function (entityData: IEntity) {
    const ownerEntity = (entityData instanceof EntityModel)
        ? entityData : await Entity.findOne(entityData)
    if (!ownerEntity) {
        throw new Error(`Entity doesn't exist (${JSON.stringify(entityData)}).`)
    }
    // return Account.find({ ownerEntityId: ownerEntity._id })
}

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