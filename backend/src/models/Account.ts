import mongoose, { Document, Model, ObjectId, Schema } from 'mongoose'
import { defaultSchemaOptions } from '../database'
import { IEntity, EntityModel } from './Entity'
import { IPaymentCard, PaymentCard, PaymentCardSchema } from './PaymentCard'
import { IWallet, schema as Wallet  } from './Wallet'
import { Account, AccountStatus, AccountTypes, IAccount } from 'common/Types/Account'
import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'
import { myModelOptions } from 'src/config'
import { Entity } from 'common/src/types/entity'
// import { EntityRefSchema } from './Entity'

AccountSchema.statics.getByOwner = async function (entityData: IEntity) {
    const ownerEntity = (entityData instanceof EntityModel)
        ? entityData : await EntityModel.findOne(entityData)

    if (!ownerEntity) {
        throw new Error(`Entity doesn't exist (${JSON.stringify(entityData)}).`)
    }
    // return Account.find({ ownerEntityId: ownerEntity._id })
}

/*************************************************************************************
 * Clase "Account"
 */
@modelOptions(myModelOptions)
export class AccountBackend extends Account implements IAccount {
    @prop()
    id: ObjectId;

    @prop({ type: AccountStatus, required: true })
    status: AccountStatus

    @prop({ type: AccountTypes, required: true })
    type: AccountTypes

    @prop({ type: Entity })
    adminEntity: String

    @prop({ type: Entity })
    ownerEntity: String

    @prop({ type: [Wallet] })
    wallets: [ typeof Wallet ]

    @prop({ type: [PaymentCard] })
    paymentCards: [ typeof PaymentCard ]

    // Método abstracto para obtener el tipo de persona
    async getByOwner(entityData: IEntity): Promise<Entity> {
        const ownerEntity = (entityData instanceof Entity)
            ? entityData : await Entity.findOne(entityData)

        if (!ownerEntity) {
            throw new Error(`Entity doesn't exist (${JSON.stringify(entityData)}).`)
        }
        return ownerEntity
    }

    // Método abstracto para obtener el tipo de persona
    getTipo(): string {
        throw new Error('El método getTipo() debe ser implementado por las clases hijas');
    }
}

// Genera el modelo a partir de la clase utilizando Typegoose
export const AccountModel = getModelForClass(AccountBackend);
