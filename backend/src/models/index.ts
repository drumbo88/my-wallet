import { Currency, CurrencyModel, seeds as CurrencySeeds } from './Currency'
import { Country, CountryModel, seeds as CountrySeeds } from './Country'
// import { Company, seeds as CompanySeeds } from './Company'
// import { Person, seeds as PersonSeeds } from './Person'
import { Entity, EntityModel, seeds as EntitySeeds } from './Entity'
import { PaymentCard, PaymentCardModel, seeds as PaymentCardSeeds } from './PaymentCard'
import { Operation, OperationModel, seeds as OperationSeeds } from './Operation'
import { Transaction, seeds as TransactionSeeds, TransactionModel } from './Transaction'
import { Document } from 'mongoose'

export interface IDocument {
    postSave: Document[]
}
export class ModelClass {
    constructor(data: any) {
        for (const prop in data) {
            this[prop] = data[prop]
        }
        //console.log({this:this})
    }
}

export default {
    Currency: { model: CurrencyModel, seeds: CurrencySeeds },
    Country: { model: CountryModel, seeds: CountrySeeds },
    // Company: { model: Company, seeds: CompanySeeds },
    // Person: { model: Person, seeds: PersonSeeds },
    Entity: { model: EntityModel, seeds: EntitySeeds },
    PaymentCard: { model: PaymentCardModel, seeds: PaymentCardSeeds },
    Operation: { model: OperationModel, seeds: OperationSeeds },
    Transaction: { model: TransactionModel, seeds: TransactionSeeds },
}