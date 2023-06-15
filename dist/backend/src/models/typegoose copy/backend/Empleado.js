"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpleadoModel = exports.EmpleadoBackend = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const Persona_1 = require("../common/Persona");
const Empresa_1 = require("./Empresa");
const Persona_2 = require("./Persona");
const _EJEMPLO_typegoose_2_1 = require("../_EJEMPLO_typegoose_2");
const Empleado_1 = require("../common/Empleado");
/*************************************************************************************
 * Clase "Empleado" que extiende "Persona"
 */
let EmpleadoBackend = class EmpleadoBackend extends Empleado_1.Empleado {
    getTipo() {
        return Persona_1.Persona.tipos.EMPLEADO;
    }
};
__decorate([
    (0, typegoose_1.prop)({ type: String, unique: true, required: true })
], EmpleadoBackend.prototype, "nombre", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Number })
], EmpleadoBackend.prototype, "edad", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Number, required: true })
], EmpleadoBackend.prototype, "salario", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => Empresa_1.EmpresaBackend })
], EmpleadoBackend.prototype, "empresa", void 0);
EmpleadoBackend = __decorate([
    (0, typegoose_1.modelOptions)(_EJEMPLO_typegoose_2_1.myModelOptions)
], EmpleadoBackend);
exports.EmpleadoBackend = EmpleadoBackend;
// Genera el modelo a partir de la clase utilizando Typegoose
exports.EmpleadoModel = (0, typegoose_1.getDiscriminatorModelForClass)(Persona_2.PersonaModel, EmpleadoBackend, 'Empleado');
