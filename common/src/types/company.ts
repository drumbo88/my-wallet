export enum CompanyTypes {
    COMPANY = 'COMPANY',
    E_WALLET = 'E_WALLET',
    BANK = 'BANK',
    CRYPTO_WALLET = 'CRYPTO_WALLET',
    CRYPTO_EXCHANGE = 'CRYPTO_EXCHANGE',
}
export interface ICompanyData {
    legalName?: String,
    fantasyName?: String,
    type: CompanyTypes,
}
/*export interface ICompany extends IEntity {
    company: ICompanyData
}*/