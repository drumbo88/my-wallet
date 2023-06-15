"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpresaFrontend = void 0;
const Empresa_1 = require("../common/Empresa");
// Frontend class
class EmpresaFrontend extends Empresa_1.Empresa {
    //nuevoEmpleado(this: ReturnModelType<typeof EmpresaFrontend>, e: Empleado) {
    nuevoEmpleado(empleado) {
        return __awaiter(this, void 0, void 0, function* () {
            //empleado.empresa = this.id
            //await empleado.save()
        });
    }
    particularImplementation() {
        console.log(this.nombre);
    }
    static getByNombre(nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch(`api/empresa/${nombre}`)
                .then(res => res.json());
        });
    }
}
exports.EmpresaFrontend = EmpresaFrontend;
