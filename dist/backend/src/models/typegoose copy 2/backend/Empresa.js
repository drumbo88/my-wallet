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
var Empleado_1, Empresa_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpresaModel = exports.Empresa = exports.EmpleadoModel = exports.Empleado = void 0;
const typegoose_1 = require("@typegoose/typegoose");
//import { Empresa, IEmpresa } from "../common/Empresa";
const _EJEMPLO_typegoose_2_1 = require("../_EJEMPLO_typegoose_2");
//import { Empleado } from "./Empleado";
class Model {
}
//  class
let Empleado = Empleado_1 = class Empleado extends Model {
    static getByNombre(nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne({ nombre });
        });
    }
};
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true })
], Empleado.prototype, "nombre", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String })
], Empleado.prototype, "taxNumber", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => Empresa })
], Empleado.prototype, "empresa", void 0);
Empleado = Empleado_1 = __decorate([
    (0, typegoose_1.modelOptions)(_EJEMPLO_typegoose_2_1.myModelOptions)
], Empleado);
exports.Empleado = Empleado;
// Genera el modelo a partir de la clase utilizando Typegoose
exports.EmpleadoModel = (0, typegoose_1.getModelForClass)(Empleado);
function findOrCreateDocument(model, query) {
    return __awaiter(this, void 0, void 0, function* () {
        if (query instanceof model) {
            return query;
        }
        else {
            const existingDocument = yield model.findOne(query);
            if (existingDocument) {
                return existingDocument;
            }
            else {
                const newDocument = new model(query);
                return newDocument.save();
            }
        }
    });
}
//  class
let Empresa = Empresa_1 = class Empresa {
    //nuevoEmpleado(this: ReturnModelType<typeof Empresa>, e: Empleado) {
    nuevoEmpleado(empData) {
        return __awaiter(this, void 0, void 0, function* () {
            let empleado = yield findOrCreateDocument(exports.EmpleadoModel, empData);
            /*if (empData instanceof Document) {
                empleado = empData as DocumentType<Empleado>
            } else {
                let filter: any = {}
                if (empData instanceof Empleado)
                    filter = empData
                else {
                    if (empData.taxNumber) {
                        filter.taxNumber = empData.taxNumber
                    } else if (empData.nombre) {
                        filter.nombre = empData.nombre
                    }
                }
                empleado = await EmpleadoModel.findOne(filter) || await EmpleadoModel.create(empData)
            }*/
            empleado.empresa = this.id;
            yield empleado.save();
            console.log({ empleado });
            return this;
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
], Empresa.prototype, "nombre", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String })
], Empresa.prototype, "taxNumber", void 0);
Empresa = Empresa_1 = __decorate([
    (0, typegoose_1.modelOptions)(_EJEMPLO_typegoose_2_1.myModelOptions)
], Empresa);
exports.Empresa = Empresa;
// Genera el modelo a partir de la clase utilizando Typegoose
exports.EmpresaModel = (0, typegoose_1.getModelForClass)(Empresa);
(() => __awaiter(void 0, void 0, void 0, function* () {
    const e = yield exports.EmpresaModel.create({ taxNumber: '123123' });
    e.nuevoEmpleado({ taxNumber: '345345' });
    console.log({ empresa: e });
}));
