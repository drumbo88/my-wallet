"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seeds = exports.CompanySchema = exports.CompanyTypes = void 0;
const mongoose_1 = require("mongoose");
const database_1 = require("../database");
var CompanyTypes;
(function (CompanyTypes) {
    CompanyTypes["COMPANY"] = "COMPANY";
    CompanyTypes["E_WALLET"] = "E_WALLET";
    CompanyTypes["BANK"] = "BANK";
    CompanyTypes["CRYPTO_WALLET"] = "CRYPTO_WALLET";
    CompanyTypes["CRYPTO_EXCHANGE"] = "CRYPTO_EXCHANGE";
})(CompanyTypes = exports.CompanyTypes || (exports.CompanyTypes = {}));
exports.CompanySchema = new mongoose_1.Schema({
    legalName: String,
    fantasyName: String,
    type: { type: String, enum: CompanyTypes, default: CompanyTypes.COMPANY },
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
            type: CompanyTypes.BANK,
        }
    },
    {
        name: 'Mercado Pago',
        taxId: '30703088534',
        company: {
            type: CompanyTypes.E_WALLET,
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
            type: CompanyTypes.CRYPTO_EXCHANGE,
        }
    },
];
