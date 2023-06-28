/*************************************************************************************
 * Clase "Currency"
 */

export enum CurrencyType {
    FIAT = 'FIAT',
    CRYPTO = 'CRYPTO',
}

// Common props
export class ICurrencyProps {
    // code: String
    // symbol: String
    // name: String
    // value: number
    // api?: String
    // type: CurrencyType
}
// Common methods
export interface ICurrencyMethods {
    // fooCurrency(): String,
    // barCurrency(): void,
}
// Common Class interface
export interface ICurrency extends ICurrencyProps, ICurrencyMethods {
}

// Common Class
export abstract class Currency extends ICurrencyProps implements ICurrencyMethods {
    //abstract nuevoEmpleado(empleado: IEmpleado): Promise<void>
    //abstract particularImplementation(): void
    static getByCode(code: string): Promise<ICurrency | null> {
        throw new Error("Cannot call abstract static method");
    }
}