"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyModel = exports.seeds = exports.CurrencyBackend = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const config_1 = require("src/config");
const currency_1 = require("common/types/currency");
/*************************************************************************************
 * Clase "Currency" para monedas FIAT y CRIPTO
 */
let CurrencyBackend = class CurrencyBackend extends currency_1.Currency {
    // Método abstracto para obtener el tipo de currency
    getTipo() {
        throw new Error('El método getTipo() debe ser implementado por las clases hijas');
    }
};
__decorate([
    (0, typegoose_1.prop)({ type: String, unique: true, required: true })
], CurrencyBackend.prototype, "code", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, unique: true, required: true })
], CurrencyBackend.prototype, "symbol", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true })
], CurrencyBackend.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Number })
], CurrencyBackend.prototype, "value", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String })
], CurrencyBackend.prototype, "api", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: currency_1.CurrencyType, default: currency_1.CurrencyType.FIAT })
], CurrencyBackend.prototype, "type", void 0);
CurrencyBackend = __decorate([
    (0, typegoose_1.modelOptions)(config_1.myModelOptions)
], CurrencyBackend);
exports.CurrencyBackend = CurrencyBackend;
exports.seeds = [
    { symbol: '$', code: 'ARS', name: 'Peso Argentino', value: 1 / 130 },
    { symbol: '$', code: 'USD', name: 'Dólar Estadounidense', value: 1 },
    { symbol: '$', code: 'BRL', name: 'Real Brasileño', value: 1 / 35.5 },
    { symbol: '₿', code: 'BTC', name: 'Bitcoin', value: 19000, type: currency_1.CurrencyType.CRYPTO },
];
// Genera el modelo a partir de la clase utilizando Typegoose
exports.CurrencyModel = (0, typegoose_1.getModelForClass)(CurrencyBackend);
