import { DocumentType, getModelForClass, modelOptions, prop, Ref, ReturnModelType } from '@typegoose/typegoose';
import { myModelOptions } from '../config';
import { Account, AccountModel, DocAccount } from './Account';
import { BaseModel, DocPartial } from './BaseModel';
import { DocEntity, Entity, EntityModel } from './Entity';
// import { seeds as PaymentCardCreditSeeds } from './PaymentCardCredit';
// import { seeds as PaymentCardDebitSeeds } from './PaymentCardDebit';
// import { seeds as PaymentCardPrepaidSeeds } from './PaymentCardPrepaid';
import { PaymentCardTypes, PaymentCardStatus } from "common/types/paymentCard";


export const seeds = {
    // [PaymentCardTypes.DEBIT]: PaymentCardDebitSeeds,
    // [PaymentCardTypes.CREDIT]: PaymentCardCreditSeeds,
    // [PaymentCardTypes.PREPAID]: PaymentCardPrepaidSeeds,
}

export type DocPaymentCard = DocumentType<PaymentCard>;

/*************************************************************************************
 * Clase "PaymentCard"
 */
@modelOptions(myModelOptions)
export class PaymentCard extends BaseModel
{
    @prop({ type: String, required: true })
    name: string

    @prop({ type: String, required: true })
    number: string

    @prop({ type: Date, required: true })
    expDate: Date

    /* Opc: Cuenta a la que está vinculada la tarjeta (puede no tener) */
    @prop({ type: () => Account, ref: () => 'Account' })
    ownerAccount?: Ref<Account>

    /* Opc: Entidad que administra la tarjeta (puede no tener) */
    @prop({ type: () => Entity, ref: () => 'Entity' })
    adminEntity?: Ref<Entity>

    /* Opc: Entidad que da el servicio de la tarjeta (puede no tener) */
    @prop({ type: () => Entity, ref: () => 'Entity' })
    serviceEntity?: Ref<Entity>

    @prop({
        type: String, required: true,
        get: v => (v / 100).toFixed(2),
        set: v => v * 100,
    })
    balance: number

    @prop({ type: String, enum: PaymentCardStatus, required: true, default: PaymentCardStatus.INACTIVE })
    status: string

    @prop({ type: String, enum: PaymentCardTypes, required: true })
    type: string

    /**
     *
     */
    async setOwnerAccount(this: DocPaymentCard, accountData: DocPartial<Account>) {
        let ownerAccount: Account
        if (accountData instanceof Account)
            ownerAccount = accountData
        else {
            const pipelines: any[] = []
            for (const field in accountData) {
                pipelines.push({ $lookup: { from: "entities", localField: field + "Id", foreignField: "_id", as: field } })
                pipelines.push({ $unwind: '$' + field })
                for (const subfield in accountData[field]) {
                    accountData[field + '.' + subfield] = accountData[field][subfield]
                }
                delete accountData[field]
            }
            pipelines.push({ $match: accountData })

            ownerAccount = (await AccountModel.aggregate(pipelines).limit(1).exec()).shift()
        }
        if (!ownerAccount) {
            throw new Error(`Account doesn't exist (${JSON.stringify(accountData)}).`)
        }
        ownerAccount.paymentCards.push(this.id)
        return this
    }

    /**
     *
     */
    async unsetAdminEntity(this: DocPaymentCard) {
        return this.setAdminEntity(null)
    }

    /**
     *
     */
    async unsetServiceEntity(this: DocPaymentCard) {
        return this.setServiceEntity(null)
    }

    /**
     *
     */
    async getOwnerEntity(this: DocPaymentCard, entityData: DocPartial<Entity>) {
        return await EntityModel.getOneOrFail(entityData)
    }

    /**
     *
     */
    async setServiceEntity(this: DocPaymentCard, entityData: DocEntity | null = null) {
        if (!entityData)
            this.serviceEntity = undefined
        else {
            const serviceEntity = await EntityModel.getOne(entityData)
            if (!serviceEntity) {
                throw new Error(`Entity doesn't exist (${JSON.stringify(entityData)}).`)
            }
            this.serviceEntity = serviceEntity
        }
        return this
    }

    /**
     *
     */
    async setAdminEntity(this: DocPaymentCard, entityData: Entity | null = null) {
        if (!entityData)
            this.adminEntity = undefined
        else {
            const adminEntity = await EntityModel.getOne(entityData)
            if (!adminEntity) {
                throw new Error(`Entity doesn't exist (${JSON.stringify(entityData)}).`)
            }
            this.adminEntity = adminEntity
        }
        return this
    }

    /**
     *
     */
    static async seed(this: ReturnModelType<typeof PaymentCard>, seeds: Partial<IPaymentCardSeed>[]) {
        const paymentCards: DocPaymentCard[] = await this.insertMany<PaymentCard>([])
        for (const i in seeds) {
            const seed = seeds[i]
            const paymentcard = paymentCards[i]

            if (!seed.ownerAccount)
                throw new Error(`PaymentCard's ownerAccount is required.`)
            // if (!seed.serviceEntity)
            //     throw new Error(`PaymentCard's serviceEntity is required.`)

            await Promise.all([
                paymentcard.setOwnerAccount(seed.ownerAccount),
                paymentcard.setAdminEntity(seed.adminEntity),
                paymentcard.setServiceEntity(seed.serviceEntity),
            ])

            await paymentcard.save()
        }
    }

}

interface IPaymentCardSeed {
    name, number, expDate, balance,
    ownerAccount,
    adminEntity,
    serviceEntity
}

// Genera el modelo a partir de la clase utilizando Typegoose
export const PaymentCardModel = getModelForClass(PaymentCard);
