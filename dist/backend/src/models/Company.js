"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seeds = exports.CompanySchema = void 0;
const mongoose_1 = require("mongoose");
const database_1 = require("../database");
const company_1 = require("common/src/types/company");
exports.CompanySchema = new mongoose_1.Schema({
    legalName: String,
    fantasyName: String,
    type: { type: String, enum: company_1.CompanyTypes, default: company_1.CompanyTypes.COMPANY },
}, database_1.defaultSchemaOptions);
exports.seeds = [
    {
        name: 'VISA',
        //taxId: '',
    },
    {
        name: 'MasterCard',
        //taxId: '',
    },
    {
        name: 'BBVA Francés',
        taxId: '30500003193',
        company: {
            type: company_1.CompanyTypes.BANK,
        }
    },
    {
        name: 'Mercado Pago',
        taxId: '30703088534',
        company: {
            type: company_1.CompanyTypes.E_WALLET,
        }
    },
    {
        name: 'Foncap SA',
        taxId: '30692317714',
        accountsOwned: [{
                adminEntity: { taxId: '30500003193' },
            }]
    },
    {
        name: 'Roti El Sol',
        taxId: '30333333339',
        accountsOwned: [{
                adminEntity: { taxId: '30703088534' },
            }]
    },
    {
        name: 'Binance',
        company: {
            type: company_1.CompanyTypes.CRYPTO_EXCHANGE,
        }
    },
];
