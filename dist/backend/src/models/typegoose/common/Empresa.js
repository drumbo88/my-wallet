"use strict";
/*************************************************************************************
 * Clase "Empresa"
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Empresa = void 0;
// Common Class
class Empresa {
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
