"use strict";
/*************************************************************************************
 * Clase "Empresa"
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Empresa = exports.IEmpresaProps = void 0;
// Common props
class IEmpresaProps {
}
exports.IEmpresaProps = IEmpresaProps;
// Common Class
class Empresa extends IEmpresaProps {
    fooEmpresa() {
        return `Nombre: ${this.nombre}`;
    }
    barEmpresa() {
        console.log(this.nombre);
    }
    //abstract nuevoEmpleado(): Promise<void>
    //abstract particularImplementation(): void
    static getByNombre(nombre) {
        throw new Error("Cannot call abstract static method");
    }
}
exports.Empresa = Empresa;
