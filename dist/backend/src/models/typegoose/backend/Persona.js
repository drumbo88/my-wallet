"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonaModel = exports.PersonaBackend = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const Persona_1 = require("../common/Persona");
const _EJEMPLO_typegoose_2_1 = require("../_EJEMPLO_typegoose_2");
/*************************************************************************************
 * Clase abstracta "Persona" (Employee | Client)
 */
let PersonaBackend = class PersonaBackend extends Persona_1.Persona {
    // Método abstracto para obtener el tipo de persona
    getTipo() {
        throw new Error('El método getTipo() debe ser implementado por las clases hijas');
    }
};
__decorate([
    (0, typegoose_1.prop)({ type: String, unique: true, required: true })
], PersonaBackend.prototype, "nombre", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Number })
], PersonaBackend.prototype, "edad", void 0);
PersonaBackend = __decorate([
    (0, typegoose_1.modelOptions)(_EJEMPLO_typegoose_2_1.myModelOptions)
], PersonaBackend);
exports.PersonaBackend = PersonaBackend;
// Genera el modelo a partir de la clase utilizando Typegoose
exports.PersonaModel = (0, typegoose_1.getModelForClass)(PersonaBackend);
