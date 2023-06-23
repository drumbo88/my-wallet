import { CompanyTypes } from 'common/src/types/company'
import { DocumentType, modelOptions, prop } from '@typegoose/typegoose';
import { BaseModel } from './BaseModel';
import { myModelOptions } from '../config';

export type DocCompany = DocumentType<Company>;

/*************************************************************************************
 * Clase "Company"
 */
@modelOptions(myModelOptions)
export class Company extends BaseModel {
    @prop({ type: String, required: true })
    firstname: string

    @prop({ type: String, required: true })
    lastname: string

    @prop({ type: Date })
    birthdate: Date

    @prop({ type: String, enum: CompanyTypes, default: CompanyTypes.COMPANY })
    type: String
}

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
