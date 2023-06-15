"use strict";
/*************************************************************************************
 * Clase "Currency"
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Currency = exports.ICurrencyProps = exports.CurrencyType = void 0;
var CurrencyType;
(function (CurrencyType) {
    CurrencyType["FIAT"] = "FIAT";
    CurrencyType["CRYPTO"] = "CRYPTO";
})(CurrencyType = exports.CurrencyType || (exports.CurrencyType = {}));
// Common props
class ICurrencyProps {
}
exports.ICurrencyProps = ICurrencyProps;
// Common Class
class Currency extends ICurrencyProps {
    //abstract nuevoEmpleado(empleado: IEmpleado): Promise<void>
    //abstract particularImplementation(): void
    static getByCode(code) {
        throw new Error("Cannot call abstract static method");
    }
}
exports.Currency = Currency;
