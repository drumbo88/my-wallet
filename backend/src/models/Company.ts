import { CompanyTypes } from 'common/types/company'
import { DocumentType, modelOptions, prop } from '@typegoose/typegoose';
import { BaseModel } from './BaseModel';
import { myModelOptions, myModelOptionsNoId } from '../config';

export type DocCompany = DocumentType<Company>;

/*************************************************************************************
 * Clase "Company"
 */
@modelOptions(myModelOptionsNoId)
export class Company extends BaseModel
{
    @prop({ type: String })
    legalName: string

    @prop({ type: String })
    fantasyName: string

    @prop({ type: String })
    shortName: string

    @prop({ type: String, enum: CompanyTypes, default: CompanyTypes.COMPANY })
    type: String
}

export const seeds = [
    {
        company: {
            shortName: 'VISA',
        },
        //taxId: '',
    },
    {
        company: {
            shortName: 'MasterCard',
        },
        //taxId: '',
    },
    {
        taxId: '30500003193',
        company: {
            shortName: 'BBVA Francés',
            type: CompanyTypes.BANK,
        }
    },
    {
        taxId: '30703088534',
        company: {
            shortName: 'Mercado Pago',
            type: CompanyTypes.E_WALLET,
        }
    },
    {
        taxId: '30692317714',
        company: {
            shortName: 'Foncap SA',
        },
        accountsOwned: [{
          adminEntity: { taxId: '30500003193' },
        }]
    },
    {
        taxId: '30333333339',
        company: {
            shortName: 'Roti El Sol',
        },
        accountsOwned: [{
          adminEntity: { taxId: '30703088534' },
        }]
    },
    {
        legalName: 'Binance',
        company: {
            type: CompanyTypes.CRYPTO_EXCHANGE,
        }
    },
]
