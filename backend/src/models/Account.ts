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
    @prop({ type: AccountStatus, required: true })
    status: AccountStatus

    @prop({ type: AccountTypes, required: true })
    type: AccountTypes

    @prop({ type: () => Entity, ref: Entity })
    adminEntity: Entity

    @prop({ type: () => Entity, ref: Entity })
    ownerEntity: Entity

    @prop({ type: () => [Wallet], ref: Wallet })
    wallets: Ref<Wallet>[]

    @prop({ type: () => [PaymentCard], ref: PaymentCard })
    paymentCards: Ref<PaymentCard>[]

    // Buscar por dueño de la cuenta
    static async findOneByOwner(entityData: DocPartial<Entity>): Promise<Entity> {
        const ownerEntity = (entityData instanceof EntityModel)
            ? entityData : await AccountModel.findOne({ ownerEntity: entityData })

        if (!ownerEntity) {
            throw new Error(`Entity doesn't exist (${JSON.stringify(entityData)}).`)
        }

        return ownerEntity.populate('account').account
    }
    /*
        public async findUserByPostTitle(title: string): Promise<DocumentType<User> | null> {
            const post = await PostModel.findOne({ title }).populate('user');
            if (post && post.user)
                return post.user;
            return null;
    }
    */

    // Método abstracto para obtener el tipo de persona
    getTipo(): string {
        throw new Error('El método getTipo() debe ser implementado por las clases hijas');
    }
}

// Genera el modelo a partir de la clase utilizando Typegoose
export const AccountModel = getModelForClass(Account);
