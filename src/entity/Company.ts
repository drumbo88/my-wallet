import { Schema, model } from 'mongoose'
import { IPersonEntity, PersonEntitySchema } from './PersonEntity'

export enum CompanyTypes {
    COMPANY = 'COMPANY',
    E_WALLET = 'E_WALLET',
    BANK = 'BANK',
    CRYPTO_WALLET = 'CRYPTO_WALLET',
    CRYPTO_EXCHANGE = 'CRYPTO_EXCHANGE',
}
export interface ICompany extends IPersonEntity {
    legalName?: String,
    fantasyName: String,
    type: CompanyTypes,
}

export const seeds = [
    {
        name: 'BBVA Francés',
        taxId: '30500003193',
        type: CompanyTypes.BANK,
    },
    {
        name: 'Foncap SA',
        taxId: '30692317714',
        /*accounts: [{
          adminEntity: { taxId: '30500003193' },
        }]*/
    },
    {
        name: 'Binance',
        type: CompanyTypes.CRYPTO_EXCHANGE,
    },
]

const CompanySchema = PersonEntitySchema.add({
    legalName: String,
    fantasyName: String,
    type: { type: String, enum: CompanyTypes, default: CompanyTypes.COMPANY },
})

export const Company = model<ICompany>('Company', CompanySchema)
