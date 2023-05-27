import { Schema, Model, Document, model } from 'mongoose'
import { defaultSchemaOptions } from '../database';
import { Account, IAccount } from './Account';
import { Entity, IEntity, EntityModel } from './Entity';
import { seeds as PaymentCardCreditSeeds, PaymentCardCreditSchema } from './PaymentCardCredit';
import { seeds as PaymentCardDebitSeeds, PaymentCardDebitSchema } from './PaymentCardDebit';
import { seeds as PaymentCardPrepaidSeeds, PaymentCardPrepaidSchema } from './PaymentCardPrepaid';

enum PaymentCardStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    EXPIRED = 'EXPIRED',
}
enum PaymentCardTypes {
    DEBIT = 'debit',
    CREDIT = 'credit',
    PREPAID = 'prepaid',
}

export interface IPaymentCard {
    /* Data fields */
    name: String,
    number: String,
    expDate: String,

    ownerAccountId?: Schema.Types.ObjectId,
    userEntityId?: Schema.Types.ObjectId,
    serviceEntityId?: Schema.Types.ObjectId,
    //adminEntityId?: Schema.Types.ObjectId,
    ownerAccount?: IAccount,
    userEntity?: IEntity,
    serviceEntity?: IEntity,
    //adminEntity?: IEntity,

    balance?: number,
    status?: PaymentCardStatus,

    /*limits: {
        payment: {
            day: { type: Number, min: 0 },
            week: { type: Number, min: 0 },
            month: { type: Number, min: 0 },
            all: { type: Number, min: 0 },
        },
        extraction: {
            day: { type: Number, min: 0 },
            week: { type: Number, min: 0 },
            month: { type: Number, min: 0 },
            all: { type: Number, min: 0 },
        },
    },*/
    /* Virtuals */
    setOwnerAccount(accountData: IAccount): Promise<IPaymentCardDocument>
    setAdminEntity(entityData: IEntity): Promise<IPaymentCardDocument>
    setUserEntity(entityData?: IEntity): Promise<IPaymentCardDocument>
    unsetUserEntity(): Promise<IPaymentCardDocument>
    setServiceEntity(entityData?: IEntity): Promise<IPaymentCardDocument>
    unsetServiceEntity(): Promise<IPaymentCardDocument>
}
export const seeds = {
    [PaymentCardTypes.DEBIT]: PaymentCardDebitSeeds,
    [PaymentCardTypes.CREDIT]: PaymentCardCreditSeeds,
    [PaymentCardTypes.PREPAID]: PaymentCardPrepaidSeeds,
}
const schemaOptions = { ...defaultSchemaOptions }
schemaOptions.toJSON.getters = true
export const PaymentCardSchema = new Schema({
    name: { type: String },
    number: { type: String, max: 16 },
    expDate: { type: String },

    ownerAccountId: { type: Schema.Types.ObjectId, ref: 'Account' }, //
    userEntityId: { type: Schema.Types.ObjectId, ref: 'Entity' }, // Null=Me, notNull=Extension
    serviceEntityId: { type: Schema.Types.ObjectId, ref: 'Entity' }, // (opt.) Visa / Mastercard
    //adminEntityId: { type: Schema.Types.ObjectId, ref: 'PaymentCard' }, // DC=Company | CC=Company/null | PPC=Sube/Previaje=>MinTransporte / GiftVoucher=>Company

    balance: {
        type: Number, required: true,
        get: v => (v/100).toFixed(2),
        set: v => v*100,
    },
    status: { type: String, enum: PaymentCardStatus, default: PaymentCardStatus.ACTIVE, required: true },

    debit: PaymentCardDebitSchema,
    credit: PaymentCardCreditSchema,
    prepaid: PaymentCardPrepaidSchema,
  }, schemaOptions)

export interface IPaymentCardModel extends Model<IPaymentCard> {}
export interface IPaymentCardDocument extends Document<IPaymentCardModel>, IPaymentCard {
    // methods
    method(param: number): Promise<IPaymentCardDocument>,
}

/**
 *
 */
PaymentCardSchema.methods.setOwnerAccount = async function (accountData: IAccount) {
    let ownerAccount
    if (accountData instanceof Account)
        ownerAccount = accountData
    else {
        const pipelines: any[] = []
        for (const field in accountData) {
            pipelines.push({ $lookup: { from: "entities", localField: field + "Id", foreignField: "_id", as: field } })
            pipelines.push({ $unwind: '$'+field })
            for (const subfield in accountData[field]) {
                accountData[field+'.'+subfield] = accountData[field][subfield]
            }
            delete accountData[field]
        }
        pipelines.push({ $match: accountData })

        ownerAccount = (await Account.aggregate(pipelines).limit(1).exec()).shift()
    }
    if (!ownerAccount) {
        throw new Error(`Account doesn't exist (${JSON.stringify(accountData)}).`)
    }
    this.ownerAccountId = ownerAccount._id
    return this
}

/**
 *
 */
PaymentCardSchema.methods.unsetUserEntity = async function () {
    return this.setUserEntity(null)
}

/**
 *
 */
PaymentCardSchema.methods.unsetServiceEntity = async function () {
    return this.setServiceEntity(null)
}

/**
 *
 */
PaymentCardSchema.methods.setServiceEntity = async function (entityData?: IEntity) {
  if (!entityData)
    this.serviceEntityId = null
  else {
    const serviceEntity = (entityData instanceof EntityModel)
        ? entityData : await Entity.findOne(entityData)
    if (!serviceEntity) {
        throw new Error(`Entity doesn't exist (${JSON.stringify(entityData)}).`)
    }
    this.serviceEntityId = serviceEntity.id
  }
  return this
}

/**
 *
 */
PaymentCardSchema.methods.setAdminEntity = async function (entityData: IEntity) {
  const adminEntity = (entityData instanceof EntityModel)
    ? entityData : await Entity.findOne(entityData)
  if (!adminEntity) {
    throw new Error(`Entity doesn't exist (${JSON.stringify(entityData)}).`)
  }
  this.adminEntityId = adminEntity.id
  return this
}

/**
 *
 */
PaymentCardSchema.methods.setUserEntity = async function (entityData?: IEntity) {
    if (!entityData)
        this.serviceEntityId = null
    else {
        const userEntity = (entityData instanceof EntityModel)
            ? entityData : await Entity.findOne(entityData)
        if (!userEntity) {
            throw new Error(`Entity doesn't exist (${JSON.stringify(entityData)}).`)
        }
        this.userEntityId = userEntity.id
    }
    return this
}

/**
 *
 */
PaymentCardSchema.statics.seed = async function (seeds: IPaymentCard[]) {
  const paymentCards: IPaymentCardDocument[] = await this.insertMany(seeds)
  for (const i in seeds) {
    const seed = seeds[i]
    const paymentcard = paymentCards[i]

    if (!seed.ownerAccount)
        throw new Error(`PaymentCard's ownerAccount is required.`)
    // if (!seed.serviceEntity)
    //     throw new Error(`PaymentCard's serviceEntity is required.`)

    await Promise.all([
        paymentcard.setOwnerAccount(seed.ownerAccount),
        paymentcard.setUserEntity(seed.userEntity),
        paymentcard.setServiceEntity(seed.serviceEntity),
    ])

    await paymentcard.save()
  }
}

export const PaymentCard = model('PaymentCard', PaymentCardSchema)
