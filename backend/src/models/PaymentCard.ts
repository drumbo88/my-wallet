import { DocumentType, getModelForClass, ModelOptions, prop, Ref, ReturnModelType } from '@typegoose/typegoose';
import { Schema, Model, Document, model } from 'mongoose'
import { myModelOptions } from '../config';
import { defaultSchemaOptions } from '../database';
import { Account, AccountModel, DocAccount } from './Account';
import { BaseModel, DocPartial } from './BaseModel';
import { DocEntity, Entity, EntityModel } from './Entity';
import { seeds as PaymentCardCreditSeeds, PaymentCardCreditSchema } from './PaymentCardCredit';
import { seeds as PaymentCardDebitSeeds, PaymentCardDebitSchema } from './PaymentCardDebit';
import { seeds as PaymentCardPrepaidSeeds, PaymentCardPrepaidSchema } from './PaymentCardPrepaid';
import { PaymentCardTypes, PaymentCardStatus } from "common/types/paymentCard";


export const seeds = {
    [PaymentCardTypes.DEBIT]: PaymentCardDebitSeeds,
    [PaymentCardTypes.CREDIT]: PaymentCardCreditSeeds,
    [PaymentCardTypes.PREPAID]: PaymentCardPrepaidSeeds,
}

export type DocPaymentCard = DocumentType<PaymentCard>;

/*************************************************************************************
 * Clase "PaymentCard"
 */
@ModelOptions(myModelOptions)
export class PaymentCard extends BaseModel {
    @prop({ type: String, required: true })
    name: string

    @prop({ type: String, required: true })
    number: string

    @prop({ type: String, required: true })
    expDate: string

    /* Opc: Cuenta a la que está vinculada la tarjeta (puede no tener) */
    @prop({ type: () => Account, ref: Account })
    ownerAccount?: Ref<Account> | null

    /* Opc: Entidad que administra la tarjeta (puede no tener) */
    @prop({ type: () => Entity, ref: Entity })
    adminEntity?: Ref<Entity> | null

    /* Opc: Entidad que da el servicio de la tarjeta (puede no tener) */
    @prop({ type: () => Entity, ref: Entity })
    serviceEntity?: Ref<Entity> | null

    @prop({
        type: String, required: true,
        get: v => (v / 100).toFixed(2),
        set: v => v * 100,
    })
    balance: number

    @prop({ type: PaymentCardStatus, required: true, default: PaymentCardStatus.INACTIVE })
    status: string

    /**
     *
     */
    async setOwnerAccount(this: DocPaymentCard, accountData: DocAccount) {
        let ownerAccount
        if (accountData instanceof AccountModel)
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
        this.ownerAccount = ownerAccount._id
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
