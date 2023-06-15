"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var EmpresaBackend_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpresaModel = exports.EmpresaBackend = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const Empresa_1 = require("../common/Empresa");
const _EJEMPLO_typegoose_2_1 = require("../_EJEMPLO_typegoose_2");
// Backend class
let EmpresaBackend = EmpresaBackend_1 = class EmpresaBackend extends Empresa_1.Empresa {
    //nuevoEmpleado(this: ReturnModelType<typeof EmpresaBackend>, e: Empleado) {
    nuevoEmpleado(empleado) {
        return __awaiter(this, void 0, void 0, function* () {
            empleado.empresa = this.id;
            yield empleado.save();
        });
    }
    particularImplementation() {
        console.log(this.nombre);
    }
    static getByNombre(nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne({ nombre });
        });
    }
};
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true })
], EmpresaBackend.prototype, "nombre", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String })
], EmpresaBackend.prototype, "taxNumber", void 0);
EmpresaBackend = EmpresaBackend_1 = __decorate([
    (0, typegoose_1.modelOptions)(_EJEMPLO_typegoose_2_1.myModelOptions)
], EmpresaBackend);
exports.EmpresaBackend = EmpresaBackend;
// Genera el modelo a partir de la clase utilizando Typegoose
exports.EmpresaModel = (0, typegoose_1.getModelForClass)(EmpresaBackend);
