import { Schema } from 'mongoose'
import { defaultSchemaOptions } from '../database'
import { IEntity } from './Entity'
import { CompanyTypes } from 'common/src/types/company'

export const CompanySchema = new Schema({
    legalName: String,
    fantasyName: String,
    type: { type: String, enum: CompanyTypes, default: CompanyTypes.COMPANY },
}, defaultSchemaOptions)

export const seeds = [
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
]
