"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Currency_1 = require("./Currency");
const Country_1 = require("./Country");
// import { Company, seeds as CompanySeeds } from './Company'
// import { Person, seeds as PersonSeeds } from './Person'
const Entity_1 = require("./Entity");
const PaymentCard_1 = require("./PaymentCard");
const Operation_1 = require("./Operation");
const Transaction_1 = require("./Transaction");
exports.default = {
    Currency: { model: Currency_1.Currency, seeds: Currency_1.seeds },
    Country: { model: Country_1.Country, seeds: Country_1.seeds },
    // Company: { model: Company, seeds: CompanySeeds },
    // Person: { model: Person, seeds: PersonSeeds },
    Entity: { model: Entity_1.Entity, seeds: Entity_1.seeds },
    PaymentCard: { model: PaymentCard_1.PaymentCard, seeds: PaymentCard_1.seeds },
    Operation: { model: Operation_1.Operation, seeds: Operation_1.seeds },
    Transaction: { model: Transaction_1.Transaction, seeds: Transaction_1.seeds },
};
