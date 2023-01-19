import { Currency, seeds as CurrencySeeds } from './Currency'
import { Country, seeds as CountrySeeds } from './Country'
// import { Company, seeds as CompanySeeds } from './Company'
// import { Person, seeds as PersonSeeds } from './Person'
import { Entity, seeds as EntitySeeds } from './Entity'
import { Operation, seeds as OperationSeeds } from './Operation'
import { Transaction, seeds as TransactionSeeds } from './Transaction'

export default {
    Currency: { model: Currency, seeds: CurrencySeeds },
    Country: { model: Country, seeds: CountrySeeds },
    // Company: { model: Company, seeds: CompanySeeds },
    // Person: { model: Person, seeds: PersonSeeds },
    Entity: { model: Entity, seeds: EntitySeeds },
    Operation: { model: Operation, seeds: OperationSeeds },
    Transaction: { model: Transaction, seeds: TransactionSeeds },
}