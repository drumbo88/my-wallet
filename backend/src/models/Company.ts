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
    @prop({ type: String, trim: true })
    legalName: string

    @prop({ type: String, trim: true })
    fantasyName: string

    @prop({ type: String, trim: true })
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
        taxId: '30500010912',
        company: {
            shortName: 'Banco Nación',
            type: CompanyTypes.BANK,
        },
        website: "https://www.bna.com.ar"
    },
    {
        taxId: '30697265895',
        company: {
            shortName: 'Banco de Servicios Financieros',
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
        taxId: '20110083301',
        company: {
            shortName: 'Min. Transporte',
            type: CompanyTypes.COMPANY,
        },
        website: "https://www.argentina.gob.ar/transporte"
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
            shortName: 'Binance',
            type: CompanyTypes.CRYPTO_EXCHANGE,
        }
    },
]
