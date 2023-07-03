import { EntityModel, Entity } from './Entity'
import { PaymentCard } from './PaymentCard'
import { Wallet } from './Wallet'
import { AccountStatus, AccountTypes, IAccount } from 'common/Types/Account'
import { DocumentType, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose'
import { myModelOptions } from '../config'
import { BaseModel, DocPartial } from './BaseModel'
// import { EntityRefSchema } from './Entity'

export type DocAccount = DocumentType<Account>;

/*************************************************************************************
 * Clase "Account"
 */
@modelOptions(myModelOptions)
export class Account extends BaseModel {
    @prop({ type: String, enum: AccountStatus, required: true })
    status: AccountStatus

    @prop({ type: String, enum: AccountTypes, required: true })
    type: AccountTypes

    @prop({ type: () => Entity, ref: () => Entity })
    adminEntity: Ref<Entity>

    @prop({ type: () => Entity, ref: () => Entity })
    ownerEntity: Ref<Entity>

    @prop({ type: () => [Wallet] })
    wallets: Wallet[]

    @prop({ type: () => [PaymentCard], ref: () => PaymentCard })
    paymentCards: Ref<PaymentCard>[]

    // Buscar por dueño de la cuenta
    static async findOneByOwner(entityData: DocPartial<Entity>): Promise<DocAccount | null> {
        const ownerEntity = await EntityModel.getOne(entityData)

        if (!ownerEntity) {
            throw new Error(`Entity doesn't exist (${JSON.stringify(entityData)}).`)
        }
//await AccountModel.findOne({ ownerEntity: entityData })
        //return ownerEntity.populate('account').account
        return await AccountModel.findOne({ ownerEntity })
    }
    /*
        public async findUserByPostTitle(title: string): Promise<DocumentType<User> | null> {
            const post = await PostModel.findOne({ title }).populate('user');
            if (post && post.user)
                return post.user;
            return null;
    }
    */

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

    statusStr() {
        switch (this.status) {
            case AccountStatus.ACTIVE:
                return 'Activo'
            case AccountStatus.INACTIVE:
                return 'Inactivo'
        }
    }

}

// Genera el modelo a partir de la clase utilizando Typegoose
export const AccountModel = getModelForClass(Account);
