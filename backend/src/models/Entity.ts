import { Document } from 'mongoose'
import { User } from './User';
import { AccountModel, Account, DocAccount } from './Account';
import { seeds as PersonSeeds, Person } from './Person';
import { seeds as CompanySeeds, Company, DocCompany } from './Company';
import { PaymentCard, PaymentCardModel } from './PaymentCard';
import { DocumentType, getModelForClass, isDocument, modelOptions, prop, Ref, ReturnModelType } from "@typegoose/typegoose";
import { EntityStatus, EntityTypes } from "common/types/entity";
import { myModelOptions } from '../config';
import { Currency } from './Currency';
import { BaseModel, DocPartial } from './BaseModel';
import { PaymentCardCredit } from './PaymentCardCredit';
import { Wallet, DocWallet, WalletModel } from './Wallet';
import { Asset } from './Asset';
import { OperationItemConcept } from './OperationItemConcept';
import { OperationItemTypes } from 'common/types/operationItem';
import { PaymentCardTypes } from 'common/types/paymentCard';
import { PaymentCardDebit } from './PaymentCardDebit';
import { PaymentCardPrepaid } from './PaymentCardPrepaid';

export const seeds = {
    [EntityTypes.COMPANY]: CompanySeeds,
    [EntityTypes.PERSON]: PersonSeeds,
}

export type DocEntity = DocumentType<Entity>;

class Concept {
    @prop({ type: String, unique: true, trim: true })
    name: string

    @prop({ type: String, enum: OperationItemTypes })
    type: string

    @prop({ refPath: 'type' })
    concept: Ref<Asset | OperationItemConcept>

    @prop({ type: Boolean, required: true, default: false })
    favorite: boolean
}

/*************************************************************************************
 * Clase abstracta "Entity" (Person | Company)
 */
@modelOptions(myModelOptions)
export class Entity extends BaseModel
{
    // @prop({ type: String })
    // name: string

    @prop({ type: String, enum: EntityStatus, required: true, default: EntityStatus.ACTIVE })
    status: string

    @prop({ type: String, unique: true, sparse: true, trim: true })
    taxId: string

    @prop({ type: () => User })
    user: User

    @prop({ ref: () => Currency, localField: 'currencyCode', foreignField: 'code' })
    currency?: Ref<Currency, string>
    @prop({ type: String })
    currencyCode?: string

    @prop({ type: () => Person })
    person?: Person

    @prop({ type: () => Company })
    company?: Company

    @prop({ type: String, trim: true })
    website: string

    // @prop({ type: () => [Account], ref: () => Account })
    // accountsOwned!: Ref<Account>[]
    async getAccountsOwned(this: DocumentType<Entity>): Promise<DocAccount[]> {
        return await AccountModel.find({ ownerEntity: this._id }).exec();
    }

    // @prop({ type: () => [Account], ref: () => Account })
    // accountsAdministrated!: Ref<Account>[]
    async getAccountsAdministrated(this: DocumentType<Entity>): Promise<DocAccount[]> {
        return await AccountModel.find({ adminEntity: this._id }).exec();
    }

    // Concepts named by entity
    @prop({ type: () => Concept, ref: () => Concept })
    concepts!: Ref<Concept>[]

    static async createPerson(this: ReturnModelType<typeof Entity>, data: Partial<Person>): Promise<DocEntity> {
        return await this.create(data)
    }
    static async createCompany(this: ReturnModelType<typeof Entity>, data: DocCompany): Promise<DocEntity> {
        return await this.create(data)
    }

    static async getPeople(this: ReturnModelType<typeof Entity>, data: any) {
        // que person esté definido y company sea null
        if (!data.person) data.person = {}
        data.person.$exists = true
        data.person.$ne = null
        if (data.company) delete data.company
        //data.$or = [ { company: { $exists: false } }, { company: { $in: ['', null] } } ]
        return await EntityModel.find(data)
    }

    static async getCompanies(this: ReturnModelType<typeof Entity>, data: any) {
        // que company esté definido y person sea null
        if (!data.company) data.company = {}
        data.company.$exists = true
        data.company.$ne = null
        if (data.person) delete data.person
        //data.$or = [ { person: { $exists: false } }, { person: { $in: ['', null] } } ]
        return EntityModel.find(data)
    }

    async addOwnedAccount(
        this: DocEntity,
        accountData: DocPartial<Account>
    ): Promise<Document<Entity>> {
        accountData.ownerEntity = this
        const adminEntity = await EntityModel.getOne(accountData.adminEntity)
        if (!adminEntity) {
            throw new Error(`Entity doesn't exist (${JSON.stringify(accountData.adminEntity)}).`)
        }
        accountData.adminEntity = adminEntity
        await AccountModel.create(accountData)
        return this.toObject()
    }

    async addAdministratedAccount(
        this: DocEntity,
        accountData: DocPartial<Account>
    ): Promise<DocEntity> {
        accountData.adminEntity = this
        const ownerEntity = await EntityModel.getOne(accountData.ownerEntity)
        if (!ownerEntity) {
            throw new Error(`Entity doesn't exist (${JSON.stringify(accountData.ownerEntity)}).`)
        }
        accountData.ownerEntity = ownerEntity
        await AccountModel.create(accountData)
        return this.toObject()
    }

    /**
     * @accountData
     *  @value null: unique account / Error
     *  @value IAccount: Account to use
     */
    async addCard(
        this: DocEntity,
        cardData: DocPartial<PaymentCard>,
        accountData?: DocPartial<Account>
    ): Promise<DocEntity>
    {
        const adminEntity = cardData.adminEntity
            ? await EntityModel.getOneOrFail<Entity>(cardData.adminEntity)
            : accountData?.adminEntity

        if (!adminEntity) {
            throw new Error(`Account's adminEntity doesn't exist (${JSON.stringify(accountData)}).`)
        }

        cardData.adminEntity = adminEntity

        const accsOwned = (await this.getAccountsOwned()).filter(acc => adminEntity._id.equals(acc.adminEntity._id))
        //console.log({adminEntity, accsOwned})
        if (!accountData) {
            switch (accsOwned.length) {
                case 0:
                    break // throw new Error(`Entity doesn't have an Account to add the card (${JSON.stringify(creditCardData)}).`)
                case 1:
                    accountData = accsOwned[0]

                    const account = await AccountModel.getOne(accountData)
                    if (!account) {
                        throw new Error(`Account doesn't exist (${JSON.stringify(accountData)}).`)
                    }
                    await account.populate('ownerEntity')
                    if (account.ownerEntity.id != this.id) {
                        throw new Error(`The Account to add the card should be owned by the same Entity (${JSON.stringify({ this: this.id, accOwnerId: account.ownerEntity.id })}).`)
                    }

                    break
                default:
                    throw new Error(`Must specify which Account does the card belong (${JSON.stringify(cardData)}).`)
            }
        }

        const creditCard = await PaymentCardModel.getOrCreate(cardData)
        await creditCard.populate({ path: 'ownerAccount', model: AccountModel })

        // if (account.id != creditCard.ownerAccount?.id) {
        //     throw new Error(`The Account to add the card should be owned by the same Entity (${JSON.stringify({ this: this.id, accOwnerId: account.ownerEntity })}).`)
        // }

        console.log(`Credit added (${creditCard.type})`)

        return this.toObject()
    }

    async addDebitCard(
        this: DocEntity,
        cardData: DocPartial<PaymentCardDebit>,
        accountData?: DocPartial<Account>
    ): Promise<DocEntity>
    {
        cardData.type = PaymentCardTypes.DEBIT
        return await this.addCard(cardData, accountData)
    }

    async addCreditCard(
        this: DocEntity,
        cardData: DocPartial<PaymentCardCredit>,
        accountData?: DocPartial<Account>
    ): Promise<DocEntity>
    {
        cardData.type = PaymentCardTypes.CREDIT
        return await this.addCard(cardData, accountData)
    }

    async addPrepaidCard(
        this: DocEntity,
        cardData: DocPartial<PaymentCardPrepaid>,
        accountData?: DocPartial<Account>
    ): Promise<DocEntity>
    {
        cardData.type = PaymentCardTypes.PREPAID
        return await this.addCard(cardData, accountData)
    }

    static async seed(seeds: any[]): Promise<DocEntity | DocEntity[]> {
        const retOne = !Array.isArray(seeds)
        if (retOne)
            seeds = [seeds]
        const entities: DocEntity[] = [] // await EntityModel.insertMany<Entity>(seeds)
        for (const i in seeds) {
            const seed = seeds[i]
            const {
                accountsOwned, accountsAdministrated,
                debitCards, creditCards, prepaidCards,
                ...entityData
            } = seed

            const entity = await EntityModel.create(entityData) //entities[i]

            if (accountsOwned?.length) {
                //console.log({seed})
                for (const accData of accountsOwned)
                    await entity.addOwnedAccount(accData)
            }
            if (accountsAdministrated?.length) {
                for (const accData of accountsAdministrated)
                    await entity.addAdministratedAccount(accData)
            }
            await entity.save()
            if (debitCards) for (const cardData of debitCards) {
                entity.addDebitCard(cardData)
            }
            if (creditCards) for (const cardData of creditCards) {
                entity.addCreditCard(cardData)
            }
            if (prepaidCards) for (const cardData of prepaidCards) {
                entity.addPrepaidCard(cardData)
            }
            if (entity.taxId == '20337466711')
                console.log({myEntityId:entity.id})
        }
        return retOne ? entities.pop() as DocEntity : entities
    }

}

export interface IEntitySeed {
    name, status, taxId, user,
    currency, accountsOwned, accountsAdministrated, addOwnedAccount,
    addAdministratedAccount, addCreditCard
}

// Genera el modelo a partir de la clase utilizando Typegoose
export const EntityModel = getModelForClass(Entity);
